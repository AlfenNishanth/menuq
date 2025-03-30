import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, XCircleIcon, XIcon } from "lucide-react";
import { updateMenuItem, getMenuItem } from "../../api/menuItem";
import { useParams, useNavigate } from "react-router-dom";

export default function EditMenuItem() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  
  const { id } = useParams(); // Get the menu item ID from URL
  const navigate = useNavigate();
  
  const [variants, setVariants] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagError, setTagError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  
  const fileInputRef = useRef();
  const { currentUser, userData } = useAuth();

  // Fetch menu item data when component mounts
  useEffect(() => {
    async function fetchMenuItem() {
      try {
        setFetchLoading(true);
        const menuItem = await getMenuItem(id);
        
        // Set form values
        setValue("name", menuItem.name);
        setValue("description", menuItem.description || "");
        
        if (menuItem.type && !["Starter", "Main Course", "Drinks", "Cold Beverages", "Desserts"].includes(menuItem.type)) {
          setValue("type", "Custom");
          setValue("customType", menuItem.type);
        } else {
          setValue("type", menuItem.type || "Starter");
        }
        
        setValue("price", menuItem.price);
        setValue("available", menuItem.available ? "true" : "false");
        
        // Set variants, addOns and tags
        if (menuItem.variants && menuItem.variants.length > 0) {
          setVariants(menuItem.variants);
        }
        
        if (menuItem.addOns && menuItem.addOns.length > 0) {
          setAddOns(menuItem.addOns);
        }
        
        if (menuItem.tags && menuItem.tags.length > 0) {
          setTags(menuItem.tags);
        }
        
        // Set image
        if (menuItem.imageUrl) {
          setOriginalImageUrl(menuItem.imageUrl);
          setImagePreview(menuItem.imageUrl);
        }
        
      } catch (error) {
        console.error("Error fetching menu item:", error);
        toast.error(`Error loading menu item: ${error.message}`);
      } finally {
        setFetchLoading(false);
      }
    }
    
    if (id) {
      fetchMenuItem();
    }
  }, [id, setValue]);

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
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setOriginalImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data) => {
    if (!currentUser) {
      toast.error("You must be logged in to update menu items!");
      return;
    }

    setLoading(true);

    const restaurantID = userData.restaurantId;
    const finalType = data.type === "Custom" ? data.customType.toLowerCase() : data.type;

    const formData = new FormData();
    formData.append("menuItemId", id);
    formData.append("restaurantID", restaurantID);
    formData.append("name", data.name.toLowerCase());
    formData.append("description", data.description.toLowerCase());
    formData.append("type", finalType);
    formData.append("price", parseFloat(data.price));
    formData.append("available", data.available);
    
    if (variants.length !== 0) formData.append("variants", JSON.stringify(variants));
    if (addOns.length !== 0) formData.append("addOns", JSON.stringify(addOns));
    if (tags.length !== 0) formData.append("tags", JSON.stringify(tags));
    
    // If we have a new image file, append it
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (originalImageUrl) {
      // Keep the original image
      formData.append("imageUrl", originalImageUrl);
    }

    try {
      await updateMenuItem(formData);
      toast.success("Menu item updated successfully!");
      navigate("/menu-management"); // Navigate back to menu management page
    } catch (error) {
      console.error("Error updating menu item:", error);
      toast.error(`Error updating menu item: ${error.message}`);
    }
    
    setLoading(false);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
        <p className="ml-2 text-lg text-gray-700">Loading menu item...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 py-8">
      <div className="p-8 rounded-2xl shadow-xl w-full max-w-lg bg-white">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Edit Menu Item</h2>
        
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-4"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
              e.preventDefault();
            }
          }}
        >
          <div className="grid grid-cols-1 gap-4">
            {/* Name */}
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Item Name"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900 ${
                errors.name ? "border-red-500 ring-1 ring-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm -mt-3">{errors.name.message}</p>
            )}

            {/* Description */}
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
              disabled={loading}
              rows={3}
            />

            {/* Type Dropdown */}
            <select
              {...register("type")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
              onChange={(e) => {
                setValue("type", e.target.value);
                if (e.target.value !== "Custom") {
                  setValue("customType", "");
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
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900 ${
                  errors.customType ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                disabled={loading}
              />
            )}
            {errors.customType && (
              <p className="text-red-500 text-sm -mt-3">{errors.customType.message}</p>
            )}

            {/* Price */}
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              placeholder="Base Price"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
              disabled={loading}
            />
            {errors.price && (
              <p className="text-red-500 text-sm -mt-3">{errors.price.message}</p>
            )}

            {/* Availability Toggle */}
            <Controller
              name="available"
              control={control}
              defaultValue="true"
              render={({ field }) => (
                <select 
                  {...field} 
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
                  disabled={loading}
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              )}
            />

            {/* Image Upload */}
            <div className="border-2 border-dashed rounded-lg p-4 transition border-gray-300 hover:border-teal-400 text-center">
              <div className="space-y-2">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Menu Item Preview" 
                      className="mx-auto h-36 object-cover rounded-lg"
                    />
                    <button 
                      type="button" 
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                    >
                      <XIcon size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Upload className="mx-auto text-4xl mb-2" />
                    <p className="text-sm font-medium">Upload Menu Item Image</p>
                    <p className="text-xs mt-1">JPG, PNG or GIF (Max. 5MB)</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="menu-item-image"
                />
                
                {!imagePreview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                  >
                    Browse Image
                  </button>
                )}
                
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                  >
                    Change Image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="p-4 rounded-lg shadow-md transition bg-gray-50">
            <h3 className="font-semibold mb-2">Variants</h3>
            <div className="space-y-2">
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
                    className="p-3 border rounded-lg transition flex-1 bg-gray-200 border-gray-300 text-gray-900"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[index].price = parseFloat(e.target.value);
                      setVariants(newVariants);
                    }}
                    className="p-3 border rounded-lg transition w-24 bg-gray-200 border-gray-300 text-gray-900"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setVariants(variants.filter((_, i) => i !== index))}
                    className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                    disabled={loading}
                  >
                    <XIcon size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setVariants([...variants, { name: "", price: 0 }])}
                disabled={loading}
                className="mt-2 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors bg-teal-600 text-white hover:bg-teal-700"
              >
                Add Variant
              </button>
            </div>
          </div>

          {/* Add Ons Section */}
          <div className="p-4 rounded-lg shadow-md transition bg-gray-50">
            <h3 className="font-semibold mb-2">Add Ons</h3>
            <div className="space-y-2">
              {addOns.map((addOn, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add On Name"
                    value={addOn.name}
                    onChange={(e) => {
                      const newAddOns = [...addOns];
                      newAddOns[index].name = e.target.value;
                      setAddOns(newAddOns);
                    }}
                    className="p-3 border rounded-lg transition flex-1 bg-gray-200 border-gray-300 text-gray-900"
                    disabled={loading}
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={addOn.price}
                    onChange={(e) => {
                      const newAddOns = [...addOns];
                      newAddOns[index].price = parseFloat(e.target.value);
                      setAddOns(newAddOns);
                    }}
                    className="p-3 border rounded-lg transition w-24 bg-gray-200 border-gray-300 text-gray-900"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setAddOns(addOns.filter((_, i) => i !== index))}
                    className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                    disabled={loading}
                  >
                    <XIcon size={18} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setAddOns([...addOns, { name: "", price: 0 }])}
                disabled={loading}
                className="mt-2 w-full px-4 py-2 text-sm font-medium rounded-md transition-colors bg-teal-600 text-white hover:bg-teal-700"
              >
                Add New
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <div className="p-4 rounded-lg shadow-md transition bg-gray-50">
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="ml-2 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center transition bg-teal-200 text-teal-600 hover:bg-teal-300"
                    disabled={loading}
                  >
                    <span className="text-xs">×</span>
                  </button>
                </span>
              ))}
            </div>
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
                className="flex-1 p-3 border rounded-lg transition bg-gray-200 border-gray-300 text-gray-900"
                disabled={loading}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 font-medium rounded-lg transition-colors bg-teal-600 text-white hover:bg-teal-700"
                disabled={loading}
              >
                Add
              </button>
            </div>
            {tagError && (
              <p className="text-red-500 text-sm mt-1">{tagError}</p>
            )}
          </div>

          <div className="flex space-x-3">
            <button 
              type="button" 
              onClick={() => navigate("/menu-management")}
              className="w-1/3 bg-gray-500 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-lg" 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="w-2/3 bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center" 
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Update Menu Item"
              )}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="light" 
      />
    </div>
  );
}