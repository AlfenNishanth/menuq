import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { db, storage } from "../fireabse/firebase";
import { useAuth } from "../contexts/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, XCircleIcon, XIcon } from "lucide-react";
import { v4 } from "uuid";
import { addMenuItem } from "../api/menuItem";

export default function AddNewMenuItem() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [variants, setVariants] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagError, setTagError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  //   const [value, setValue] = useState("");
  //   const [customType, setCustomType] = useState("");

  const { currentUser, userData } = useAuth();

  //   console.log(currentUser)

  const addTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();

    if (trimmedTag === "") {
      setTagError("Please enter a tag.");
      return;
    }
    if (tags.includes(trimmedTag)) {
      setTagError("Tag already exists.");
      return;
    }

    setTags([...tags, trimmedTag]);
    setNewTag(""); // Reset input
    setTagError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // for previewing the image
    }
  };

  const onSubmit = async (data) => {
    if (!currentUser) return alert("You must be logged in to add menu items!");

    setLoading(true);

    const restaurantID = userData.restaurantId; // Assuming RestaurantID is user's UID
    const finalType = data.type === "Custom" ? data.customType : data.type;

    const formData = new FormData();
    formData.append("restaurantID", restaurantID);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", finalType);
    formData.append("price", parseFloat(data.price));
    formData.append("variants", JSON.stringify(variants));
    formData.append("available", true);
    formData.append("addOns", JSON.stringify(addOns));
    formData.append("tags", JSON.stringify(tags));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    console.log(formData);

    try {
      const response = await addMenuItem(formData);
    //   alert("Menu item added successfully!");
      toast.success("Menu item added successfully!", { autoClose: 2000 });
      reset();
      setVariants([]);
      setAddOns([]);
      setTags([]);
      setImageFile(null);
      setImageUrl("");
      //      setCustomType("");
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Error adding menu item: " + error, { autoClose: 2000 });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
          }
        }}
      >
        {/* Name */}
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Item Name"
          className={`w-full p-2 border rounded ${
            errors.name ? "border-red-500 ring-1 ring-red-500" : ""
          }`}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-2 border rounded"
          disabled={loading}
        />

        {/* Type Dropdown */}
        <select
          {...register("type")}
          className="w-full p-2 border rounded"
          onChange={(e) => {
            setValue("type", e.target.value); // Let react-hook-form track the value
            if (e.target.value !== "Custom") {
              setValue("customType", ""); // Clear customType when other type is selected
            }
          }}
          disabled={loading}
        >
          <option value="Starter">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Drinks">Drinks</option>
          <option value="Cold Beverages">Cold Beverages</option>
          <option value="Desserts">Desserts</option>
          <option value="Custom">Custom</option>
        </select>

        {/* Custom Type Input (Only when "Custom" is selected) */}
        {watch("type") === "Custom" && (
          <input
            {...register("customType", { required: "Custom type is required" })}
            type="text"
            placeholder="Enter custom category"
            className={`w-full p-2 border rounded ${
              errors.customType ? "border-red-500 ring-1 ring-red-500" : ""
            }`}
            disabled={loading}
          />
        )}
        {errors.customType && (
          <p className="text-red-500 text-sm">{errors.customType.message}</p>
        )}

        {/* Custom Type Input */}
        {/* {customType === "Custom" && (
          <input
            type="text"
            placeholder="Enter custom category"
            className="w-full p-2 border rounded"
            onChange={(e) => setCustomType(e.target.value)}
          />
        )} */}

        {/* Price */}
        <input
          type="number"
          {...register("price", { required: "Price is required" })}
          placeholder="Base Price"
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}

        {/* Variants */}
        <div className="space-y-2">
          <h3 className="font-semibold">Variants</h3>
          {variants.map((variant, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                placeholder="Variant Name"
                value={variant.name}
                onChange={(e) => {
                  const newVariants = [...variants];
                  newVariants[index].name = e.target.value;
                  setVariants(newVariants);
                }}
                className="p-2 border rounded w-1/2"
              />
              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) => {
                  const newVariants = [...variants];
                  newVariants[index].price = parseFloat(e.target.value);
                  setVariants(newVariants);
                }}
                className="p-2 border rounded w-1/2"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() =>
                  setVariants(variants.filter((_, i) => i !== index))
                }
                className="bg-red-500 text-white px-2 rounded cursor-pointer"
                disabled={loading}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setVariants([...variants, { name: "", price: 0 }])}
            disabled={loading}
            className="bg-teal-500 text-white px-4 py-1 rounded cursor-pointer"
          >
            Add Variant
          </button>
        </div>

        {/* AddOns */}
        <div className="space-y-2">
          <h3 className="font-semibold">Add Ons</h3>
          {addOns.map((addOn, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                placeholder="Add On"
                value={addOn.name}
                onChange={(e) => {
                  const newAddOns = [...addOns];
                  newAddOns[index].name = e.target.value;
                  setAddOns(newAddOns);
                }}
                className="p-2 border rounded w-1/2"
              />
              <input
                type="number"
                placeholder="Price"
                value={addOn.price}
                onChange={(e) => {
                  const newAddOns = [...addOns];
                  newAddOns[index].price = parseFloat(e.target.value);
                  setAddOns(newAddOns);
                }}
                className="p-2 border rounded w-1/2"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setAddOns(addOns.filter((_, i) => i !== index))}
                className="bg-red-500 text-white px-2 rounded cursor-pointer"
                disabled={loading}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setAddOns([...addOns, { name: "", price: 0 }])}
            disabled={loading}
            className="bg-teal-500 text-white px-4 py-1 rounded cursor-pointer"
          >
            Add New
          </button>
        </div>

        {/* Availability Toggle */}
        <Controller
          name="available"
          control={control}
          defaultValue="true"
          render={({ field }) => (
            <select {...field} className="w-full p-2 border rounded">
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          )}
          disabled={loading}
        />

        {/* Tags */}
        <div className="space-y-2">
          <h3 className="font-semibold">Tags</h3>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded inline-block mr-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                className="ml-1 text-red-600 cursor-pointer"
                disabled={loading}
              >
                ×
              </button>
            </span>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="w-full p-2 border rounded"
              disabled={loading}
            />
            <button
              type="button"
              onClick={addTag}
              //   onClick={() => {
              //     if (newTag.trim() !== "" && !tags.includes(newTag.toLowerCase())) {
              //       setTags([...tags, newTag.toLowerCase()]);
              //       setNewTag("");
              //     }
              //   }}
              className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer"
              disabled={loading}
            >
              Add
            </button>
          </div>
          {tagError && <p className="text-red-500 text-sm mt-1">{tagError}</p>}{" "}
          {/* Error Message */}
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Add Menu Item
        </button> */}

        {/* Image Upload */}
        {/* <div className="space-y-2">
          <h3 className="font-semibold">Upload Image</h3>
          <div className="w-full flex justify-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-teal-500 text-white px-4 py-2 rounded flex items-center space-x-2 cursor-pointer"
            >
              {uploading ? (
                <div className="grid place-items-center">
                  <svg
                    className="text-white animate-spin"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-900"
                    ></path>
                  </svg>
                </div>
              ) : (
                <Upload size={18} />
              )}
            </button>
          </div>
          <span>{uploading ? "Uploading..." : ""}</span>
           {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-max object-cover rounded"
            />
          )} 
        </div>  */}

        {/* Image Upload */}
        <div className="space-y-2">
          <h3 className="font-semibold">Upload Image</h3>
          {/* {imageUrl && <img src={imageUrl} alt="Uploaded" className="w-full h-max object-cover rounded mt-2" />} */}

          {imageUrl && (
            <div className="relative w-full mt-2">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-max object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImageUrl("");
                }}
                className="absolute top-0 right-0 bg-gray-500 text-white rounded-full m-1 p-1 cursor-pointer w-6 h-6 flex items-center justify-center"
              >
                <XIcon />
              </button>
            </div>
          )}
          <label
            className="border-2 border-dashed border-gray-400 rounded-lg w-full p-6 flex flex-col items-center justify-center cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];
                setImageFile(file);
                setImageUrl(URL.createObjectURL(file));
                e.dataTransfer.clearData();
              }
            }}
          >
            <Upload className="text-gray-500 mb-2" size={36} />
            <span className="text-gray-600">
              Click to upload or drag and drop
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {/* <button
            type="button"
            onClick={handleImageUpload}
            className="bg-teal-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button> */}
        </div>
        <button
          type="submit"
          className="w-full bg-teal-400 text-white p-2 rounded-lg hover:bg-teal-700 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="grid place-items-center">
              <svg
                className="text-white animate-spin"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-teal-900"
                ></path>
              </svg>
            </div>
          ) : (
            "Add Menu Item"
          )}
        </button>
      </form>
    </div>
  );
}
