import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import MenuCard from "./MenuCard";
import { getRestaurantMenu } from "../../api/menuItem";
import { fetchRestaurantByID } from "../../api/restaurant";
import { capitalizeWords } from "../../utils/format";
import { Clock, Calendar, AlertCircle, MapPin, Award, Phone } from "lucide-react";
import axios from "axios";

// Config for API endpoints
const config = {
  MENUQ: window.REACT_APP_MENUQ_API || "/api/restaurants",
};

// Comprehensive list of menu categories in logical serving order
const categoryOrder = [
  // Meal-specific menus
  "Breakfast",
  "Brunch",
  "Lunch Specials",

  // Starters and light options
  "Appetizers",
  "Starter",
  "Soups",
  "Salads",

  // Main dishes
  "Chef's Specials",
  "Signature Dishes",
  "Main Course",
  "Pasta",
  "Pizza",
  "Noodles",
  "Rice Dishes",
  "Curry",
  "Sushi",
  "Tapas",
  "Sharing Platters",

  // Supporting items
  "Sides",
  "Accompaniments",

  // Special dietary options
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Kids Menu",

  // Beverages
  "Beverages",
  "Hot Beverages",
  "Drinks",
  "Cold Beverages",
  "Mocktails",
  "Cocktails",
  "Wine List",
  "Beer",
  "Spirits",

  // Sweet endings
  "Desserts",
];

// Restaurant Name Display Component
const RestaurantNameHeader = ({ restaurantData }) => {
  if (!restaurantData || !restaurantData.restaurantName) {
    return null;
  }

  const { restaurantName, restaurantCategory, restaurantAddress } = restaurantData;

  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-800 to-amber-600 shadow-lg">
        {/* Decorative patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute left-1/4 -bottom-24 w-40 h-40 bg-white rounded-full"></div>
        </div>
        
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <div className="h-1 w-12 bg-amber-300 mr-3"></div>
                <span className="text-amber-200 text-sm font-medium tracking-wider uppercase">
                  {restaurantCategory || "Restaurant"}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                {restaurantName}
              </h1>
              
              {restaurantAddress && (
                <div className="flex items-center mt-3 text-amber-100">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm md:text-base">{restaurantAddress}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center bg-white/10 backdrop-filter backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="text-amber-300 mr-2" size={18} />
              <span className="text-white text-sm font-medium">Authentic Cuisine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to display restaurant status and hours
const RestaurantStatusInfo = ({ restaurantData }) => {
  // If no data is available yet
  if (!restaurantData) {
    return null;
  }

  const { resOpen, operatingHours = [] } = restaurantData;

  // Get current day of week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = days[new Date().getDay()];

  // Find today's hours
  const todayHours = operatingHours.find((item) => item.day === today);

  // Check if currently within operating hours (simplified check)
  const isWithinHours = () => {
    if (!todayHours) return false;

    // This is a simplified check. For a complete check, you would need to parse
    // the time strings and compare with current time
    return resOpen;
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-400 rounded-r-lg shadow-sm mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Status indicator */}
        <div className="p-4 md:p-5 flex items-center bg-white/60 backdrop-blur-sm md:w-1/3">
          <div
            className={`w-3 h-3 rounded-full mr-3 ${
              resOpen ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <div>
            <h3 className="font-medium text-gray-800">
              Restaurant is currently{" "}
              <span
                className={`font-bold ${
                  resOpen ? "text-green-600" : "text-red-600"
                }`}
              >
                {resOpen ? "OPEN" : "CLOSED"}
              </span>
            </h3>
            {todayHours && (
              <p className="text-sm text-gray-600 mt-1">
                <Clock size={14} className="inline mr-1" />
                Today's hours: {todayHours.hours}
              </p>
            )}
          </div>
        </div>

        {/* Weekly hours display - FIXED LAYOUT */}
        <div className="p-4 md:p-5 md:flex-1 border-t md:border-t-0 md:border-l border-amber-100">
          <h4 className="flex items-center text-sm font-medium text-amber-800 mb-3">
            <Calendar size={14} className="mr-1.5" />
            Operating Hours
          </h4>
          
          {operatingHours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
              {operatingHours.map((item) => (
                <div
                  key={item.day}
                  className={`flex ${
                    item.day === today ? "font-medium" : ""
                  }`}
                >
                  <span
                    className={`w-22 ${
                      item.day === today ? "text-amber-800" : "text-gray-700"
                    }`}
                  >
                    {item.day}:
                  </span>
                  <span
                    className={
                      item.day === today ? "text-amber-800" : "text-gray-600"
                    }
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic col-span-full">
              Operating hours not available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const RestaurantMenu = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [visibleCategoryGroups, setVisibleCategoryGroups] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);

  const categoryRefs = useRef({});
  const menuContainerRef = useRef(null);

  // Group categories by type for better navigation
  const categoryGroups = {
    "Meal Options": ["Breakfast", "Brunch", "Lunch Specials"],
    Starters: ["Appetizers", "Starter", "Soups", "Salads"],
    Mains: [
      "Chef's Specials",
      "Signature Dishes",
      "Main Course",
      "Pasta",
      "Pizza",
      "Noodles",
      "Rice Dishes",
      "Curry",
      "Sushi",
      "Tapas",
      "Sharing Platters",
    ],
    Extras: [
      "Sides",
      "Accompaniments",
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Kids Menu",
    ],
    Drinks: [
      "Beverages",
      "Hot Beverages",
      "Drinks",
      "Cold Beverages",
      "Mocktails",
      "Cocktails",
      "Wine List",
      "Beer",
      "Spirits",
    ],
    Desserts: ["Desserts"],
  };

  // Fetch restaurant data including status and hours
  const fetchRestaurantData = async (id) => {
    try {
      setRestaurantLoading(true);
      console.log("ID: " + id)
      const data = await fetchRestaurantByID(id);
      setRestaurantData(data);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setRestaurantLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const items = await getRestaurantMenu(id);

      // Group items by category
      const groupedItems = {};
      items.forEach((item) => {
        if (!groupedItems[item.type]) {
          groupedItems[item.type] = [];
        }
        groupedItems[item.type].push(item);
      });

      setMenuItems(groupedItems);

      // Set the first category as active
      const categories = getSortedCategories(groupedItems);
      if (categories.length > 0) {
        setActiveCategory(categories[0]);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  // Custom hook for intersection observer to detect when categories are in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.dataset.category);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all category sections
    Object.entries(categoryRefs.current).forEach(([category, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [categoryRefs.current]);

  useEffect(() => {
    fetchMenuItems();
    fetchRestaurantData(id); // Fetch restaurant status and hours
  }, [id]);

  // Sort categories according to predefined order
  const getSortedCategories = (items) => {
    return Object.keys(items).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
  };

  const scrollToCategory = (category) => {
    setActiveCategory(category);
    categoryRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleCategoryGroups = () => {
    setVisibleCategoryGroups(!visibleCategoryGroups);
  };

  // Find which group a category belongs to
  const findCategoryGroup = (category) => {
    for (const [group, categories] of Object.entries(categoryGroups)) {
      if (categories.includes(category)) {
        return group;
      }
    }
    return null;
  };

  const sortedCategories = getSortedCategories(menuItems);

  // Get only the categories that actually have menu items
  const availableCategoryGroups = {};
  Object.entries(categoryGroups).forEach(([group, categories]) => {
    const availableCategories = categories.filter((cat) =>
      sortedCategories.includes(cat)
    );
    if (availableCategories.length > 0) {
      availableCategoryGroups[group] = availableCategories;
    }
  });

  return (
    <div className="bg-white" ref={menuContainerRef}>
      {/* Navigation Bar */}
      {sortedCategories.length > 0 && (
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm py-3">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center mb-2">
              <button
                onClick={toggleCategoryGroups}
                className="text-amber-700 hover:text-amber-900 font-medium flex items-center mr-4"
              >
                <span className="mr-1">Categories</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    visibleCategoryGroups ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-2">
                  {sortedCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => scrollToCategory(category)}
                      className={`px-4 py-1.5 text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-full
                        ${
                          activeCategory === category
                            ? "bg-amber-600 text-white shadow-md"
                            : "bg-amber-50 text-amber-900 hover:bg-amber-100"
                        }`}
                    >
                      {capitalizeWords(category)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded Category Groups */}
            {visibleCategoryGroups && (
              <div className="pt-2 pb-1 border-t border-amber-100 animate-fadeIn">
                {Object.entries(availableCategoryGroups).map(
                  ([group, categories]) => (
                    <div key={group} className="mb-3 last:mb-0">
                      <h3 className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1.5">
                        {group}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              scrollToCategory(category);
                              setVisibleCategoryGroups(false);
                            }}
                            className={`px-3 py-1 text-xs transition-all whitespace-nowrap rounded
                            ${
                              activeCategory === category
                                ? "bg-amber-500 text-white"
                                : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Restaurant Name Header - Added Here */}
        {!restaurantLoading && restaurantData && (
          <RestaurantNameHeader restaurantData={restaurantData} />
        )}
        
        {/* Restaurant Status Banner */}
        {!restaurantLoading && restaurantData && (
          <RestaurantStatusInfo restaurantData={restaurantData} />
        )}

        {/* Loading State */}
        {(loading || restaurantLoading) && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
              <div className="absolute inset-3 border-2 border-amber-100 border-b-amber-400 rounded-full animate-spin-slow"></div>
            </div>
            <p className="mt-6 text-amber-800 font-medium">
              Curating the menu...
            </p>
          </div>
        )}

        {/* Empty State */}
        {sortedCategories.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-2">
              Menu Coming Soon
            </h3>
            <p className="text-gray-500 max-w-md">
              Our chefs are carefully crafting a delightful menu experience for
              you.
            </p>
          </div>
        )}

        {/* Menu Categories */}
        <div className="space-y-16">
          {sortedCategories.map((category, categoryIndex) => {
            const categoryGroup = findCategoryGroup(category);

            return (
              <div
                key={category}
                ref={(el) => (categoryRefs.current[category] = el)}
                data-category={category}
                className="scroll-mt-28"
              >
                <div className="flex flex-col mb-8">
                  {categoryGroup && (
                    <span className="text-xs uppercase tracking-wider text-amber-600 font-medium mb-1">
                      {categoryGroup}
                    </span>
                  )}
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    <h2 className="text-2xl font-serif text-gray-800">
                      {capitalizeWords(category)}
                    </h2>
                    <div className="flex-grow h-px bg-gradient-to-r from-amber-300 to-transparent ml-4"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {menuItems[category].map((item) => (
                    <div
                      key={item._id}
                      className="transform transition-all duration-500 hover:-translate-y-1"
                    >
                      <MenuCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {sortedCategories.length > 0 && !loading && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center">
              <div className="h-px w-12 bg-amber-200"></div>
              <div className="mx-4">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <div className="h-px w-12 bg-amber-200"></div>
            </div>
            <p className="text-amber-800 font-serif italic mt-4">Savor each sublime bite</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Add this to your CSS or tailwind.config.js for the animations
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
// .animate-spin-slow { animation: spin 3s linear infinite; }

export default RestaurantMenu;