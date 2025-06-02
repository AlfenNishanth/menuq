import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, XCircleIcon, XIcon, Search } from "lucide-react";
import { v4 } from "uuid";
import { addMenuItem } from "../api/menuItem";
import predefinedDishes from "../components/predefinedDishes"; // Import from separate file

export default function AddNewMenuItem() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [variants, setVariants] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [tagError, setTagError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [vegetarian, setVegetarian] = useState(false);
  const [showPredefinedModal, setShowPredefinedModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);

  const vegetarianValue = watch("vegetarian");

  const fileInputRef = useRef();
  const { currentUser, userData, updateUserData } = useAuth();

  // Set filtered dishes on mount and when search term changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredDishes(predefinedDishes);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = predefinedDishes
        .map((category) => {
          return {
            category: category.category,
            items: category.items.filter(
              (item) =>
                item.name.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term)
              // || item.tags.some(tag => tag.includes(term))
            ),
          };
        })
        .filter((category) => category.items.length > 0);

      setFilteredDishes(filtered);
    }
  }, [searchTerm]);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const selectPredefinedDish = (dish) => {
    // Fill in the form with the predefined dish details
    setValue("name", dish.name);
    setValue("description", dish.description);
    setValue("price", dish.price);
    setValue("vegetarian", dish.vegetarian);
    setValue("type", "Main Course"); // Default to Main Course, can be adjusted as needed

    // Set variants, addOns, and tags
    setVariants(dish.variants || []);
    setAddOns(dish.addOns || []);
    setTags(dish.tags || []);

    // Close the modal
    setShowPredefinedModal(false);
  };

  const onSubmit = async (data) => {
    if (!currentUser) {
      toast.error("You must be logged in to add menu items!");
      return;
    }

    setLoading(true);
    if (userData === null) {
      await updateUserData();
    }
    const restaurantID = userData.restaurantId;
    const finalType =
      data.type === "Custom" ? data.customType.toLowerCase() : data.type;

    const formData = new FormData();
    formData.append("restaurantID", restaurantID);
    formData.append("name", data.name.toLowerCase());
    formData.append("description", data.description.toLowerCase());
    formData.append("type", finalType);
    formData.append("price", parseFloat(data.price));
    formData.append("available", "true");
    formData.append("vegetarian", data.vegetarian);

    if (variants.length !== 0)
      formData.append("variants", JSON.stringify(variants));
    if (addOns.length !== 0) formData.append("addOns", JSON.stringify(addOns));
    if (tags.length !== 0) formData.append("tags", JSON.stringify(tags));

    console.log("variants:", variants);
    console.log("Addons:", addOns);
    console.log("Form data:", formData);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await addMenuItem(formData);
      toast.success("Menu item added successfully!");
      reset();
      setVariants([]);
      setAddOns([]);
      setTags([]);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error(`Error adding menu item: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 px-4 py-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
      </div>

      <div className="p-4 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg bg-white relative z-10">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 sm:mb-6 text-center text-amber-700">
          Add New Menu Item
        </h2>
        <div className="w-16 h-1 bg-amber-500 mx-auto mb-6 sm:mb-8"></div>

        {/* Quick Add Button */}
        <button
          type="button"
          onClick={() => setShowPredefinedModal(true)}
          className="mb-6 w-full px-4 py-3 text-base font-medium rounded-lg transition-colors bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 flex items-center justify-center"
        >
          <span className="mr-2">🍽️</span>
          Choose from Predefined Dishes
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
              e.preventDefault();
            }
          }}
        >
          <div className="grid grid-cols-1 gap-6">
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

          <button
            type="submit"
            className="w-full bg-amber-600 text-white p-4 rounded-lg font-semibold hover:bg-amber-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center group relative overflow-hidden"
            disabled={loading}
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-amber-700 group-hover:translate-x-0"></span>
            <span className="relative flex items-center text-lg">
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Add Menu Item to Restaurant"
              )}
            </span>
          </button>
        </form>
      </div>

      {/* Predefined Dishes Modal */}
      {showPredefinedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden">
            <div className="p-3 sm:p-4 bg-amber-50 border-b border-amber-200 flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-800">
                Choose a Predefined Dish
              </h3>
              <button
                onClick={() => setShowPredefinedModal(false)}
                className="text-gray-600 hover:text-gray-800 transition"
              >
                <XCircleIcon size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 sm:p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-amber-200 text-gray-900"
                />
                <Search
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Dishes List */}
            <div className="p-2 overflow-y-auto max-h-[50vh] sm:max-h-[60vh]">
              {filteredDishes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No dishes found matching your search.
                </div>
              ) : (
                filteredDishes.map((category, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-lg font-medium text-amber-800 px-2 py-1 mb-2 border-b border-amber-200">
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {category.items.map((dish, dishIndex) => (
                        <div
                          key={dishIndex}
                          onClick={() => selectPredefinedDish(dish)}
                          className="p-3 rounded-lg border border-amber-100 bg-white hover:bg-amber-50 cursor-pointer transition"
                        >
                          <div className="font-medium">{dish.name}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {dish.description}
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-amber-700 font-medium">
                              ₹{dish.price.toFixed(2)}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                dish.vegetarian
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {dish.vegetarian ? "Vegetarian" : "Non-veg"}
                            </span>
                          </div>
                          {dish.tags && dish.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {dish.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {dish.tags.length > 3 && (
                                <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                  +{dish.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 bg-amber-50 border-t border-amber-200 flex justify-end">
              <button
                onClick={() => setShowPredefinedModal(false)}
                className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}