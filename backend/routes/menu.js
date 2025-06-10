if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();

const Restaurant = require("../models/restaurants");
const MenuItem = require("../models/menuItem");
const Counter = require("../models/counter");

const logger = require("../logger");

const multer = require("multer");
const { v4 } = require("uuid");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.get("/:id", validateId, getMenuItems);

// async function validateId(req, res, next) {
//   try {
//     const id = req.params.id;
//     logger.info(`Middleware validateId - Validating ID: ${id}`);

//     // Handle RQ IDs (Registration)
//     if (id.startsWith('RQ')) {
//       return await handleRQValidation(req, res, id);
//     }

//     // RX IDs or others - continue to menu fetch
//     next();
//   } catch (err) {
//     logger.error(`Middleware validateId - Error: ${err.message}`);
//     return res.status(500).json({ message: err.message });
//   }
// }

// // Handle RQ validation
// async function handleRQValidation(req, res, id) {
//   try {
//     // Extract number from RQ00001 -> 1
//     const numericPart = id.replace('RQ', '').replace(/^0+/, '') || '0';
//     const idNumber = parseInt(numericPart, 10);

//     if (isNaN(idNumber)) {
//       return res.status(400).json({ message: "Invalid RQ ID format" });
//     }

//     // Check counter
//     const counter = await Counter.findById('qrCounter');
//     if (!counter || idNumber > counter.seq) {
//       return res.status(404).json({ message: "Registration ID not valid" });
//     }

//     // Check if already registered
//     const restaurant = await Restaurant.findOne({ restaurantId: id });
//     if (restaurant) {
//       // Restaurant exists, check for menu items
//       const items = await MenuItem.find({ restaurantID: id });
//       if (!items.length) {
//         return res.status(404).json({ message: "No items found for this restaurant" });
//       }
//       return res.json(items);
//     }

//     // Available for registration
//     return res.json({
//       message: "Available for registration",
//       registrationId: id,
//       redirect: "signup"
//     });

//   } catch (err) {
//     logger.error(`Error handling RQ validation ${id}: ${err.message}`);
//     return res.status(500).json({ message: err.message });
//   }
// }

// Your existing menu fetch logic (unchanged)
// async function getMenuItems(req, res) {
//   try {
//     logger.info(`GET /menu/${req.params.id} - Fetching menu items for restaurant`);
//     const id = req.params.id;
//     const items = await MenuItem.find({ restaurantID: id });

//     if (!items.length) {
//       logger.info(`GET /menu/${id} - No items found for restaurant`);
//       return res.status(404).json({ message: "No items found for this restaurant" });
//     }

//     res.json(items);
//   } catch (error) {
//     logger.error(`GET /menu/${req.params.id} - Error: ${error.message}`);
//     console.error("Error while fetching menu for restaurant: ", error);
//     res.status(500).json({ message: error.message });
//   }
// }

router.get("/:id", async (req, res) => {
  try {
    logger.info(
      `GET /menu/${req.params.id} - Fetching menu items for restaurant`
    );
    const id = req.params.id;
    const items = await MenuItem.find({ restaurantID: id });

    if (!items.length) {
      logger.info(`GET /menu/${id} - No items found for restaurant`);
      return res
        .status(404)
        .json({ message: "No items found for this restaurant" });
    }
    res.json(items);
  } catch (error) {
    logger.error(`GET /menu/${req.params.id} - Error: ${error.message}`);
    console.error("Error while fetching menu for restaurant: ", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/item/:id", async (req, res) => {
  try {
    logger.info(`GET /menu/item/${req.params.id} - Fetching single menu item`);
    const id = req.params.id;
    const item = await MenuItem.findById(id);

    if (!item) {
      logger.info(`GET /menu/item/${id} - Item not found`);
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    logger.error(`GET /menu/item/${req.params.id} - Error: ${error.message}`);
    console.error("Error while fetching menu item: ", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    logger.info(
      `POST /menu - Creating new menu item for restaurant ${req.body.restaurantID}`
    );

    const {
      restaurantID,
      name,
      description,
      type,
      price,
      variants,
      addOns,
      available,
      tags,
      vegetarian,
    } = req.body;

    let imageUrl = "";
    if (req.file) {
      console.log("calling upload func");
      imageUrl = await uploadFileToS3(req.file);
    }

    parsedTags = tags ? JSON.parse(tags) : [];
    parsedVariants = variants ? JSON.parse(variants) : [];
    parsedAddOns = addOns ? JSON.parse(addOns) : [];

    const newMenuItem = new MenuItem({
      restaurantID,
      name,
      description,
      type,
      price,
      variants: parsedVariants,
      addOns: parsedAddOns,
      imageUrl,
      available,
      tags: parsedTags,
      vegetarian,
    });
    console.log("trying to save to mongo");
    const savedMenuItem = await newMenuItem.save();
    logger.info(
      `POST /menu - Successfully created menu item with ID: ${savedMenuItem._id}`
    );
    res.status(201).json(savedMenuItem); // Respond with the saved menu item
  } catch (err) {
    logger.error(`POST /menu - Error creating menu item: ${err.message}`);
    console.error(`Error while tyring to create menu: ${err}`);
    res.status(400).json({ message: err.message });
  }
});

//update menu
router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    logger.info(`PATCH /menu/${req.params.id} - Updating menu item`);
    const { id } = req.params;
    const updateData = req.body;

    // Find the existing menu item
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Handle image update
    if (req.file) {
      console.log("New image detected, uploading...");
      const newImageUrl = await uploadFileToS3(req.file);

      // Delete old image if it exists
      if (menuItem.imageUrl) {
        console.log("Deleting old image...");
        await deleteFileFromS3(menuItem.imageUrl);
      }

      updateData.imageUrl = newImageUrl;
    }

    // Update the menu item
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    logger.info(`PATCH /menu/${id} - Successfully updated menu item`);

    res.json(updatedMenuItem);
  } catch (err) {
    logger.error(`PATCH /menu/${req.params.id} - Error: ${err.message}`);
    console.error(`Error updating menu: ${err}`);
    res.status(500).json({ message: "Server error" });
  }
});

// Availability route
router.patch("/availability/:id", async (req, res) => {
  try {
    logger.info(
      `PATCH /menu/availability/${req.params.id} - Updating availability`
    );

    const { id } = req.params;
    const { available } = req.body;

    if (typeof available !== "boolean") {
      return res.status(400).json({ message: "Invalid available value" });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { available },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    logger.info(
      `PATCH /menu/availability/${id} - Successfully updated availability to: ${available}`
    );

    return res.status(200).json(updatedMenuItem);
  } catch (error) {
    logger.error(
      `PATCH /menu/availability/${req.params.id} - Error: ${error.message}`
    );
    console.error("Error updating availability:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//update prepTime
router.patch("/prepTime/:id", async (req, res) => {
  try {
    logger.info(`PATCH /menu/prepTime/${req.params.id} - Updating prep time`);
    const { id } = req.params;
    const { prepTime } = req.body;

    if (typeof prepTime !== "number") {
      return res.status(400).json({ message: "Invalid prepTime value" });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { prepTime },
      { new: true }
    );

    if (!updatedMenuItem) {
      logger.error(`PATCH /menu/prepTime/${req.params.id} - Error - not found`);
      return res.status(404).json({ message: "Menu item not found" });
    }
    logger.info(
      `PATCH /menu/prepTime/${id} - Successfully updated prep time to: ${prepTime}`
    );
    return res.status(200).json(updatedMenuItem);
  } catch (error) {
    logger.error(
      `PATCH /menu/prepTime/${req.params.id} - Error: ${error.message}`
    );
    console.error("Error updating prepTime:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Delete menu item
router.delete("/:id", async (req, res) => {
  try {
    logger.info(`DELETE /menu/${req.params.id} - Deleting menu item`);
    const { id } = req.params;

    // Find the menu item first to get the image URL
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      logger.info(`DELETE /menu/${id} - Menu item not found`);
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Delete image from S3 if it exists
    if (menuItem.imageUrl) {
      console.log("Deleting associated image from S3...");
      try {
        await deleteFileFromS3(menuItem.imageUrl);
      } catch (imageError) {
        logger.error(
          `DELETE /menu/${id} - Error deleting image: ${imageError.message}`
        );
        // Continue with deletion even if image deletion fails
        console.log(
          "Image deletion failed, but continuing with menu item deletion"
        );
      }
    }

    // Delete the menu item from database
    await MenuItem.findByIdAndDelete(id);

    logger.info(`DELETE /menu/${id} - Successfully deleted menu item`);
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    logger.error(`DELETE /menu/${req.params.id} - Error: ${error.message}`);
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//upload file
async function uploadFileToS3(file) {
  logger.info(`Uploading file: ${file.originalname} to S3`);
  console.log("trying to upload file");

  try {
    const fileName = `${file.originalname}_${v4()}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: "public-read",
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    logger.info(`Successfully uploaded file: ${fileName} to S3`);

    // Manually construct the URL (this assumes your bucket’s public URL format)
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    logger.error(`Error uploading file to S3: ${error.message}`);
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

async function deleteFileFromS3(imageUrl) {
  try {
    logger.info(`Deleting file from S3: ${imageUrl}`);
    console.log("Trying to delete file:", imageUrl);

    // Extract the file name from the URL
    const fileName = imageUrl.split("/").pop();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    logger.info(`Successfully deleted file: ${fileName} from S3`);
    console.log("File deleted successfully:", fileName);
  } catch (error) {
    logger.error(`Error deleting file from S3: ${error.message}`);
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3");
  }
}

module.exports = router;
