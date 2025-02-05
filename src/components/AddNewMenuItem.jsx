import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { db, auth } from "../firebase/firebase"; // Firestore setup
import { collection, addDoc } from "firebase/firestore";

export default function AddNewMenuItem() {
  const { register, handleSubmit, control, reset } = useForm();
  const [customType, setCustomType] = useState("");
  const [variants, setVariants] = useState([]);
  const [tags, setTags] = useState([]);
  const user = auth.currentUser; // Get current logged-in user

  const onSubmit = async (data) => {
    if (!user) return alert("You must be logged in to add menu items!");

    const restaurantID = user.uid; // Assuming RestaurantID is user's UID
    const finalType = data.type === "Custom" ? customType : data.type;

    const menuItem = {
      name: data.name,
      description: data.description,
      type: finalType,
      price: parseFloat(data.price),
      variants,
      imageUrl: data.imageUrl,
      available: data.available === "true",
      tags,
      restaurantID,
      createdAt: new Date(), // Created timestamp
      updatedAt: new Date(), // Updated timestamp (same on creation)
    };

    try {
      await addDoc(collection(db, "Menu"), menuItem);
      alert("Menu item added successfully!");
      reset();
      setVariants([]);
      setTags([]);
      setCustomType("");
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name */}
        <input
          {...register("name", { required: true })}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
        />

        {/* Description */}
        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        {/* Type Dropdown */}
        <select
          {...register("type")}
          className="w-full p-2 border rounded"
          onChange={(e) => setCustomType("")}
        >
          <option value="Starter">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Drinks">Drinks</option>
          <option value="Cold Beverages">Cold Beverages</option>
          <option value="Desserts">Desserts</option>
          <option value="Custom">Custom</option>
        </select>

        {/* Custom Type Input */}
        {customType === "" && (
          <input
            type="text"
            placeholder="Enter custom category"
            className="w-full p-2 border rounded"
            onChange={(e) => setCustomType(e.target.value)}
          />
        )}

        {/* Price */}
        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Base Price"
          className="w-full p-2 border rounded"
        />

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
              />
              <button
                type="button"
                onClick={() => setVariants(variants.filter((_, i) => i !== index))}
                className="bg-red-500 text-white px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setVariants([...variants, { name: "", price: 0 }])
            }
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Add Variant
          </button>
        </div>

        {/* Image URL */}
        <input
          type="text"
          {...register("imageUrl")}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />

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
                className="ml-1 text-red-600"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Add tag"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                setTags([...tags, e.target.value.toLowerCase()]);
                e.target.value = "";
              }
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
}