import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, XCircleIcon, XIcon } from "lucide-react";
import { updateMenuItem, getMenuItem } from "../api/menuItem";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateMenuItem() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();

  const [variants, setVariants] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagError, setTagError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  
  // For tracking changes
  const [originalData, setOriginalData] = useState(null);
  const [originalVariants, setOriginalVariants] = useState([]);
  const [originalAddOns, setOriginalAddOns] = useState([]);
  const [originalTags, setOriginalTags] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const fileInputRef = useRef();
  const { currentUser, userData } = useAuth();

  // Function to check for changes
  const checkForChanges = () => {
    if (!originalData) return false;
    
    const currentValues = watch();
    
    // Check if form values have changed
    let isFormChanged = isDirty;
    
    // Explicitly check if the price has changed
    if (originalData.price !== parseFloat(currentValues.price)) {
      isFormChanged = true;
    }
    
    // Check if the type has changed
    const originalType = originalData.type;
    const currentType = currentValues.type === "Custom" 
      ? currentValues.customType.toLowerCase() 
      : currentValues.type;
      
    if (originalType !== currentType) {
      isFormChanged = true;
    }
    
    // Check if arrays have changed
    const areVariantsChanged = JSON.stringify(variants) !== JSON.stringify(originalVariants);
    const areAddOnsChanged = JSON.stringify(addOns) !== JSON.stringify(originalAddOns);
    const areTagsChanged = JSON.stringify(tags) !== JSON.stringify(originalTags);
    
    // Check if image has changed
    const isImageChanged = 
      (imageFile !== null) || 
      (imagePreview !== originalImageUrl && 
      (imagePreview === null || originalImageUrl === null));
    
    const hasAnyChange = isFormChanged || areVariantsChanged || areAddOnsChanged || areTagsChanged || isImageChanged;
    
    setHasChanges(hasAnyChange);
    return hasAnyChange;
  };

  // Fetch menu item data when component mounts
  useEffect(() => {
    async function fetchMenuItem() {
      try {
        setInitialLoading(true);
        const menuItemData = await getMenuItem(id);
        
        // Store original data for comparison
        setOriginalData(menuItemData);
        
        // Populate form with fetched data
        setValue("name", menuItemData.name);
        setValue("description", menuItemData.description);
        
        // Handle the type field
        if (["Starter", "Main Course", "Drinks", "Cold Beverages", "Desserts"].includes(menuItemData.type)) {
          setValue("type", menuItemData.type);
        } else {
          setValue("type", "Custom");
          setValue("customType", menuItemData.type);
        }
        
        setValue("price", menuItemData.price);
        setValue("vegetarian", menuItemData.vegetarian);
        setValue("available", menuItemData.available.toString());
        
        // Set variants, addOns, and tags
        if (menuItemData.variants && menuItemData.variants.length > 0) {
          setVariants(menuItemData.variants);
          setOriginalVariants(JSON.parse(JSON.stringify(menuItemData.variants)));
        }
        
        if (menuItemData.addOns && menuItemData.addOns.length > 0) {
          setAddOns(menuItemData.addOns);
          setOriginalAddOns(JSON.parse(JSON.stringify(menuItemData.addOns)));
        }
        
        if (menuItemData.tags && menuItemData.tags.length > 0) {
          setTags(menuItemData.tags);
          setOriginalTags([...menuItemData.tags]);
        }
        
        // Handle image preview
        if (menuItemData.imageUrl) {
          setOriginalImageUrl(menuItemData.imageUrl);
          setImagePreview(menuItemData.imageUrl);
        }
        
        // Reset form's dirty state after populating data
        reset({
          name: menuItemData.name,
          description: menuItemData.description,
          type: ["Starter", "Main Course", "Drinks", "Cold Beverages", "Desserts"].includes(menuItemData.type) 
            ? menuItemData.type 
            : "Custom",
          customType: !["Starter", "Main Course", "Drinks", "Cold Beverages", "Desserts"].includes(menuItemData.type) 
            ? menuItemData.type 
            : "",
          price: menuItemData.price,
          vegetarian: menuItemData.vegetarian,
          available: menuItemData.available.toString()
        });
        
      } catch (error) {
        console.error("Error fetching menu item:", error);
        toast.error(`Error fetching menu item: ${error.message}`);
      } finally {
        setInitialLoading(false);
      }
    }
    
    if (id) {
      fetchMenuItem();
    }
  }, [id, setValue, reset]);
  
  // Check for changes whenever relevant data changes
  useEffect(() => {
    const watchedValues = watch();
    checkForChanges();
  }, [watch(), variants, addOns, tags, imageFile, imagePreview]);

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

    // Check if anything has changed
    if (!hasChanges) {
      toast.info("No changes detected. Nothing to update.");
      return;
    }

    setLoading(true);

    const restaurantID = userData.restaurantId;
    const finalType =
      data.type === "Custom" ? data.customType.toLowerCase() : data.type;

    // Create updated data object according to your API structure
    const updatedData = {
      restaurantID: restaurantID,
      name: data.name.toLowerCase(),
      description: data.description.toLowerCase(),
      type: finalType,
      price: parseFloat(data.price),
      available: data.available === "true",
      vegetarian: data.vegetarian
    };

    // Add arrays if they exist
    if (variants.length > 0) updatedData.variants = variants;
    if (addOns.length > 0) updatedData.addOns = addOns;
    if (tags.length > 0) updatedData.tags = tags;

    // Handle image
    if (imageFile) {
      // If using FormData is required for image upload
      const formData = new FormData();
      formData.append("image", imageFile);
      
      // First upload the image and get URL back
      try {
        // This is a placeholder - you'll need to implement the image upload API
        // const uploadResponse = await uploadImage(formData);
        // updatedData.imageUrl = uploadResponse.imageUrl;

        // For now, we'll assume the image is handled separately or in your backend
        formData.append("data", JSON.stringify(updatedData));
        
        await updateMenuItem(id, formData);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(`Error uploading image: ${error.message}`);
        setLoading(false);
        return;
      }
    } else {
      // If keeping the original image or no image
      if (originalImageUrl) {
        updatedData.imageUrl = originalImageUrl;
      } else {
        updatedData.imageUrl = null; // Remove image
      }
      
      // Update menu item without image changes
      try {
        await updateMenuItem(id, updatedData);
      } catch (error) {
        console.error("Error updating menu item:", error);
        toast.error(`Error updating menu item: ${error.message}`);
        setLoading(false);
        return;
      }
    }

    toast.success("Menu item updated successfully!");
    // Navigate back after success
    setTimeout(() => {
      navigate(`/dashboard/manage-menu/`); // Adjust path as needed
    }, 2000);

    setLoading(false);
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-amber-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-4 py-8 md:px-0">
      <div className="p-4 md:p-8 rounded-2xl shadow-xl w-full max-w-lg bg-white">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-center text-amber-700">
          Update Menu Item
        </h2>

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
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Dish Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter the name of your dish (e.g., Chicken Biryani)"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-amber-200 text-gray-900 ${
                  errors.name ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Describe your dish, ingredients, cooking style (e.g., Aromatic basmati rice cooked with tender chicken pieces and traditional spices)"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-amber-200 text-gray-900"
                disabled={loading}
                rows={3}
              />
            </div>

            {/* Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Food Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("type")}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-amber-200 text-gray-900"
                onChange={(e) => {
                  setValue("type", e.target.value);
                  if (e.target.value !== "Custom") {
                    setValue("customType", "");
                  }
                }}
                disabled={loading}
                defaultValue="" // ✅ ensures the placeholder is shown initially
              >
                <option value="" disabled hidden>
                  -- Select a category --
                </option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Drinks">Drinks</option>
                <option value="Cold Beverages">Cold Beverages</option>
                <option value="Desserts">Desserts</option>
                <option value="Custom">Custom Category</option>
              </select>
            </div>

            {/* Custom Type Input (Only when "Custom" is selected) */}
            {watch("type") === "Custom" && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Custom Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("customType", {
                    required: "Custom type is required",
                  })}
                  type="text"
                  placeholder="Enter your custom category (e.g., Snacks, Breakfast, etc.)"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-amber-200 text-gray-900 ${
                    errors.customType ? "border-red-500 ring-1 ring-red-500" : ""
                  }`}
                  disabled={loading}
                />
                {errors.customType && (
                  <p className="text-red-500 text-sm">
                    {errors.customType.message}
                  </p>
                )}
              </div>
            )}

            {/* Vegetarian Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Food Type
              </label>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-amber-200">
                <div>
                  <span className="font-medium text-gray-800">
                    {watch("vegetarian") ? "🥬 Vegetarian" : "🍖 Non-vegetarian"}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    Toggle to specify if this dish contains meat or is vegetarian
                  </p>
                </div>
                <Controller
                  name="vegetarian"
                  control={control}
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <button
                      type="button"
                      onClick={() => onChange(!value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? "bg-amber-600" : "bg-gray-400"
                      }`}
                      disabled={loading}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  )}
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Base Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="1"
                min="0"
                {...register("price", { required: "Price is required" })}
                placeholder="Enter the price in rupees (e.g., 250)"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-amber-200 text-gray-900 ${
                  errors.price ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                disabled={loading}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Availability Toggle */}
            <div>
              <label htmlFor="available" className="block text-sm font-semibold text-gray-700 mb-2">
                Availability Status <span className="text-red-500"></span>
              </label>
              <Controller
                name="available"
                control={control}
                defaultValue="true"
                render={({ field }) => (
                  <select
                    id="available"
                    {...field}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-amber-200 text-gray-900 ${
                  errors.price ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                    disabled={loading}
                  >
                    <option value="true">Available for Orders</option>
                    <option value="false">Currently Not Available</option>
                  </select>
                )}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Dish Image
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-4 transition border-amber-300 hover:border-amber-400 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    e.dataTransfer.clearData();
                  }
                }}
              >
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
                      <Upload className="mx-auto h-12 w-12 mb-2 text-amber-600" />
                      <p className="text-sm font-medium">
                        Upload an appetizing photo of your dish
                      </p>
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
                      className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors"
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
          </div>

          {/* Variants Section */}
          <div className="p-4 rounded-lg shadow-md transition bg-white border border-amber-50">
            <div className="mb-3">
              <h3 className="font-serif text-xl font-semibold text-amber-700">
                Size Variants (Optional)
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Add different sizes or variants of your dish with their respective prices (e.g., Small, Medium, Large)
              </p>
            </div>
            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div key={index} className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Variant Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Small, Medium, Large"
                        value={variant.name}
                        onChange={(e) => {
                          const newVariants = [...variants];
                          newVariants[index].name = e.target.value;
                          setVariants(newVariants);
                        }}
                        className="w-full p-2 border rounded-lg transition bg-white border-gray-300 text-gray-900 text-sm"
                        disabled={loading}
                      />
                    </div>
                    <div className="flex w-full sm:w-auto">
                      <div className="flex-1 sm:w-28">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          step="1"
                          min="0"
                          placeholder="0"
                          value={variant.price}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].price = parseFloat(e.target.value) || 0;
                            setVariants(newVariants);
                          }}
                          className="w-full p-2 border rounded-lg transition bg-white border-gray-300 text-gray-900 text-sm"
                          disabled={loading}
                        />
                      </div>
                      <div className="flex items-end ml-2">
                        <button
                          type="button"
                          onClick={() =>
                            setVariants(variants.filter((_, i) => i !== index))
                          }
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                          disabled={loading}
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setVariants([...variants, { name: "", price: 0 }])
                }
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium rounded-md transition-colors bg-amber-600 text-white hover:bg-amber-700"
              >
                Add Size Variant
              </button>
            </div>
          </div>

          {/* Add Ons Section */}
          <div className="p-4 rounded-lg shadow-md transition bg-white border border-amber-50">
            <div className="mb-3">
              <h3 className="font-serif text-xl font-semibold text-amber-700">
                Add-Ons (Optional)
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Extra items customers can add to their order (e.g., Extra Cheese, Extra Sauce, Side Salad)
              </p>
            </div>
            <div className="space-y-3">
              {addOns.map((addOn, index) => (
                <div key={index} className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Add-On Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Extra Cheese, Side Salad"
                        value={addOn.name}
                        onChange={(e) => {
                          const newAddOns = [...addOns];
                          newAddOns[index].name = e.target.value;
                          setAddOns(newAddOns);
                        }}
                        className="w-full p-2 border rounded-lg transition bg-white border-gray-300 text-gray-900 text-sm"
                        disabled={loading}
                      />
                    </div>
                    <div className="flex w-full sm:w-auto">
                      <div className="flex-1 sm:w-28">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          step="1"
                          min="0"
                          placeholder="0"
                          value={addOn.price}
                          onChange={(e) => {
                            const newAddOns = [...addOns];
                            newAddOns[index].price = parseFloat(e.target.value) || 0;
                            setAddOns(newAddOns);
                          }}
                          className="w-full p-2 border rounded-lg transition bg-white border-gray-300 text-gray-900 text-sm"
                          disabled={loading}
                        />
                      </div>
                      <div className="flex items-end ml-2">
                        <button
                          type="button"
                          onClick={() =>
                            setAddOns(addOns.filter((_, i) => i !== index))
                          }
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                          disabled={loading}
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setAddOns([...addOns, { name: "", price: 0 }])}
                disabled={loading}
                className="w-full px-4 py-2 text-sm font-medium rounded-md transition-colors bg-amber-600 text-white hover:bg-amber-700"
              >
                Add New Add-On
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <div className="p-4 rounded-lg shadow-md transition bg-white border border-amber-50">
            <div className="mb-3">
              <h3 className="font-serif text-xl font-semibold text-amber-700">
                Search Tags (Optional)
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Add keywords to help customers find your dish easily (e.g., spicy, creamy, gluten-free, popular)
              </p>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                    className="ml-2 -mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center transition bg-amber-200 text-amber-600 hover:bg-amber-300"
                    disabled={loading}
                  >
                    <span className="text-xs">×</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter a tag (e.g., spicy, popular, healthy)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="w-full p-3 border rounded-lg transition bg-gray-50 border-amber-200 text-gray-900"
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                onClick={addTag}
                className="px-6 sm:px-4 py-3 sm:py-2 font-medium rounded-lg transition-colors bg-amber-600 text-white hover:bg-amber-700"
                disabled={loading}
              >
                Add Tag
              </button>
            </div>
            {tagError && (
              <p className="text-red-500 text-sm mt-2">{tagError}</p>
            )}
          </div>

          {/* Status message for changes */}
          <div className="text-center text-sm p-3 rounded-lg bg-gray-50">
            {hasChanges ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <p className="text-amber-600 font-medium">Changes detected. Ready to update.</p>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <p className="text-gray-500">No changes detected.</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white p-3 md:p-4 rounded-lg font-semibold transition duration-300 shadow-lg flex justify-center items-center text-base md:text-lg ${
              hasChanges 
                ? "bg-amber-600 hover:bg-amber-700 hover:shadow-xl transform hover:-translate-y-0.5" 
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={loading || !hasChanges}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Updating...</span>
              </div>
            ) : (
              "Update Menu Item"
            )}
          </button>
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