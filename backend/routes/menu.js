require("dotenv").config();
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");

const multer = require("multer");
const { v4 } = require("uuid");
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const items = await MenuItem.find({ restaurantID: id });

    if (!items.length) {
      return res
        .status(404)
        .json({ message: "No items found for this restaurant" });
    }
    res.json(items);
  } catch (error) {
    console.error("Error while fetching menu for restaurant: ", error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await MenuItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error while fetching menu item: ", error);
    res.status(500).json({ message: error.message });
  }
})

router.post("/", upload.single("image"), async (req, res) => {
  try {
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
      vegetarian
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
      variants:parsedVariants,
      addOns:parsedAddOns,
      imageUrl,
      available,
      tags:parsedTags,
      vegetarian
    });
    console.log("trying to save to mongo");
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem); // Respond with the saved menu item
  } catch (err) {
    console.log(`Error while tyring to create menu: ${err}`);
    res.status(400).json({ message: err.message });
  }
});

//update menu
router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
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
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });

    res.json(updatedMenuItem);
  } catch (err) {
    console.error(`Error updating menu: ${err}`);
    res.status(500).json({ message: "Server error" });
  }
});

// Availability route
router.patch("/availability/:id", async (req, res) => {
  try {
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

    return res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error("Error updating availability:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


//upload file
async function uploadFileToS3(file) {
  console.log("trying to upload file");
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
  // Manually construct the URL (this assumes your bucket’s public URL format)
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

async function deleteFileFromS3(imageUrl) {
  try {
    console.log("Trying to delete file:", imageUrl);

    // Extract the file name from the URL
    const fileName = imageUrl.split("/").pop();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    console.log("File deleted successfully:", fileName);
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3");
  }
}

module.exports = router;
