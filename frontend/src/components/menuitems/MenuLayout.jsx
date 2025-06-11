// RestaurantMenu.js

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import MenuCard from "./MenuCard";
import { getRestaurantMenu } from "../../api/menuItem";
import { fetchRestaurantByID } from "../../api/restaurant";
import { capitalizeWords } from "../../utils/format";
import { useNavigate } from "react-router-dom";

import {
  Clock,
  Calendar,
  AlertCircle,
  MapPin,
  Award,
  Phone,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import axios from "axios";


// Comprehensive list of menu categories in logical serving order
// --- IMPORTANT: CONVERT ALL TO LOWERCASE TO MATCH BACKEND STORAGE ---
const categoryOrder = [
  // Meal-specific menus
  "breakfast",
  "brunch",
  "lunch specials",

  // Starters and light options
  "appetizers",
  "starter",
  "soups",
  "salads",

  // Main dishes
  "chef's specials",
  "signature dishes",
  "main course",
  "pasta",
  "pizza",
  "noodles",
  "rice dishes",
  "curry",
  "sushi",
  "tapas",
  "sharing platters",

  // Supporting items
  "sides",
  "accompaniments",

  // Special dietary options
  "vegetarian",
  "vegan",
  "gluten-free",
  "kids menu",

  // Beverages
  "beverages",
  "hot beverages",
  "drinks",
  "cold beverages",
  "mocktails",
  "cocktails",
  "wine list",
  "beer",
  "spirits",

  // Sweet endings
  "desserts",
];

// Restaurant Name Display Component (No changes needed here)
const RestaurantNameHeader = ({ restaurantData }) => {
  if (!restaurantData || !restaurantData.restaurantName) {
    return null;
  }

  const { restaurantName, restaurantCategory, restaurantAddress } = restaurantData;

  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#b35a00] to-amber-500 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full"></div>
          <div className="absolute left-1/4 -bottom-24 w-40 h-40 bg-white rounded-full"></div>
        </div>

        <div className="relative p-6 md:p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <div className="h-1 w-10 md:w-12 bg-amber-300 mr-2 md:mr-3"></div>
                <span className="text-amber-200 text-xs md:text-sm font-medium tracking-wider uppercase">
                  {restaurantCategory || "Restaurant"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                {restaurantName}
              </h1>

              {restaurantAddress && (
                <div className="flex items-center mt-2 md:mt-3 text-amber-100">
                  <MapPin size={14} className="mr-1.5 md:mr-2" />
                  <span className="text-xs md:text-sm lg:text-base">{restaurantAddress}</span>
                </div>
              )}
            </div>

            <div className="flex items-center bg-white/10 backdrop-filter backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20">
              <Award className="text-amber-300 mr-1.5 md:mr-2" size={16} />
              <span className="text-white text-xs md:text-sm font-medium">Authentic Cuisine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to display restaurant status and hours (No changes needed here)
const RestaurantStatusInfo = ({ restaurantData }) => {
  if (!restaurantData) {
    return null;
  }

  const { resOpen, operatingHours = [] } = restaurantData;

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

  const todayHours = operatingHours.find((item) => item.day === today);

  const isWithinHours = () => {
    if (!todayHours) return false;
    return resOpen;
  };

  const [showAllHours, setShowAllHours] = useState(false);

  const displayedHours = showAllHours
    ? operatingHours
    : operatingHours.filter(item => item.day === today);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-400 rounded-r-lg shadow-sm mb-6 md:mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-4 md:p-5 flex items-center bg-white/60 backdrop-blur-sm md:w-1/3">
          <div
            className={`w-3 h-3 rounded-full mr-3 ${
              resOpen ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <div>
            <h3 className="font-medium text-gray-800 text-sm md:text-base">
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
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                <Clock size={14} className="inline mr-1" />
                Today's hours: {todayHours.hours}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 md:p-5 md:flex-1 border-t md:border-t-0 md:border-l border-amber-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="flex items-center text-xs md:text-sm font-medium text-amber-800">
              <Calendar size={14} className="mr-1.5" />
              Operating Hours
            </h4>

            <button
              className="text-xs text-amber-600 hover:text-amber-800 md:hidden"
              onClick={() => setShowAllHours(!showAllHours)}
            >
              {showAllHours ? "Show Less" : "Show All"}
            </button>
          </div>

          {operatingHours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 md:gap-y-2 text-xs md:text-sm">
              {displayedHours.map((item) => (
                <div
                  key={item.day}
                  className={`flex ${item.day === today ? "font-medium" : ""}`}
                >
                  <span
                    className={`w-18 md:w-22 ${
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
            <p className="text-gray-500 italic col-span-full text-xs md:text-sm">
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [customCategories, setCustomCategories] = useState([]); // State for custom categories from local storage

  const navigate = useNavigate();

  const categoryRefs = useRef({});
  const menuContainerRef = useRef(null);

  // --- IMPORTANT: CONVERT ALL TO LOWERCASE TO MATCH BACKEND STORAGE ---
  const categoryGroups = {
    "meal options": ["breakfast", "brunch", "lunch specials"],
    starters: ["appetizers", "starter", "soups", "salads"],
    mains: [
      "chef's specials",
      "signature dishes",
      "main course",
      "pasta",
      "pizza",
      "noodles",
      "rice dishes",
      "curry",
      "sushi",
      "tapas",
      "sharing platters",
    ],
    extras: [
      "sides",
      "accompaniments",
      "vegetarian",
      "vegan",
      "gluten-free",
      "kids menu",
    ],
    drinks: [
      "beverages",
      "hot beverages",
      "drinks",
      "cold beverages",
      "mocktails",
      "cocktails",
      "wine list",
      "beer",
      "spirits",
    ],
    desserts: ["desserts"],
  };


  // Fetch restaurant data including status and hours
  const fetchRestaurantData = async (id) => {
    try {
      setRestaurantLoading(true);
      const data = await fetchRestaurantByID(id);
      if (data.redirect == '1') { // Use '==' for loose comparison if data.redirect can be string or number
        navigate(`/signup/${id}`);
      }
      else setRestaurantData(data);
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

      // Group items by category (which will be lowercase)
      const groupedItems = {};
      items.forEach((item) => {
        // Ensure category is lowercase from the start for consistency
        const type = item.type ? item.type.toLowerCase() : 'uncategorized'; // Fallback for safety
        if (!groupedItems[type]) {
          groupedItems[type] = [];
        }
        groupedItems[type].push(item);
      });

      setMenuItems(groupedItems);

      // Dynamically add categories present in menuItems but not in categoryOrder
      // This is crucial for custom categories to be recognized
      const newCustomCategories = [];
      Object.keys(groupedItems).forEach(itemCategory => {
        if (!categoryOrder.includes(itemCategory) && !customCategories.includes(itemCategory)) {
          newCustomCategories.push(itemCategory);
        }
      });
      if (newCustomCategories.length > 0) {
        setCustomCategories(prev => [...prev, ...newCustomCategories]);
        // Also save to local storage if needed for cross-session consistency on this component
        // (though AddNewMenuItem already handles this for its own use)
        // If you want Menu component to remember custom categories even if menu items are removed,
        // you'd need to fetch and store them here as well.
        // For now, we'll rely on categories being present in menuItems for display.
      }


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


  // Intersection Observer
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

    // Observe all category sections dynamically as they are rendered
    const currentCategoryRefs = categoryRefs.current;
    Object.values(currentCategoryRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentCategoryRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, [menuItems]); // Re-run observer setup when menuItems change (i.e., on initial fetch)

  // Initial data fetch
  useEffect(() => {
    fetchMenuItems();
    fetchRestaurantData(id);
  }, [id]);

  // Handle resize events to close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileNavOpen) {
        setMobileNavOpen(false);
      }
      if (window.innerWidth < 768 && visibleCategoryGroups) {
          setVisibleCategoryGroups(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileNavOpen, visibleCategoryGroups]);

  // Sort categories according to predefined order and include custom categories
  const getSortedCategories = useCallback((items) => {
    const allCategoriesInMenu = Object.keys(items);
    const sorted = [...categoryOrder, ...customCategories].filter(category =>
      allCategoriesInMenu.includes(category)
    );

    // Add any categories from menuItems that are neither in categoryOrder nor customCategories (fallback)
    allCategoriesInMenu.forEach(category => {
      if (!sorted.includes(category)) {
        sorted.push(category);
      }
    });

    return sorted;
  }, [menuItems, customCategories]); // Recalculate when menuItems or customCategories change

  const scrollToCategory = (category) => {
    if (categoryRefs.current[category]) {
      setActiveCategory(category);
      categoryRefs.current[category].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const toggleCategoryGroups = () => {
    setVisibleCategoryGroups(!visibleCategoryGroups);
    setMobileNavOpen(false);
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
    setVisibleCategoryGroups(false);
  };

  // Find which group a category belongs to
  const findCategoryGroup = (category) => {
    for (const [group, categories] of Object.entries(categoryGroups)) {
      // Ensure comparison is consistent (both lowercase)
      if (categories.includes(category.toLowerCase())) {
        return capitalizeWords(group); // Capitalize group name for display
      }
    }
    // If not in predefined groups, it's a custom category.
    // We can display its name capitalized, or add it to a generic "Custom" group if desired.
    return "Other Categories"; // Or just return null if no group is needed
  };

  const sortedCategories = getSortedCategories(menuItems);

  // Get only the categories that actually have menu items
  const availableCategoryGroups = {};
  // Iterate through the predefined category groups (lowercase)
  Object.entries(categoryGroups).forEach(([group, categories]) => {
    const availableCategoriesInGroup = categories.filter((cat) =>
      sortedCategories.includes(cat) // Check against lowercase sortedCategories
    );
    if (availableCategoriesInGroup.length > 0) {
      availableCategoryGroups[group] = availableCategoriesInGroup;
    }
  });

  // Add custom categories to a new group if they exist and are not already in a predefined group
  const customCategoriesToDisplay = sortedCategories.filter(cat =>
    !Object.values(categoryGroups).flat().includes(cat)
  );

  if (customCategoriesToDisplay.length > 0) {
    availableCategoryGroups["other categories"] = [
      ...(availableCategoryGroups["other categories"] || []),
      ...customCategoriesToDisplay,
    ].sort((a, b) => a.localeCompare(b)); // Sort custom categories alphabetically
  }


  return (
    <div className="bg-white" ref={menuContainerRef}>
      {/* Navigation Bar */}
      {sortedCategories.length > 0 && (
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm py-3">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileNav}
                className="md:hidden text-amber-700 hover:text-amber-900 p-1"
                aria-label="Toggle menu"
              >
                {mobileNavOpen ? (
                  <X size={24} />
                ) : (
                  <MenuIcon size={24} />
                )}
              </button>

              {/* Desktop category toggle */}
              <button
                onClick={toggleCategoryGroups}
                className="hidden md:flex text-amber-700 hover:text-amber-900 font-medium items-center mr-4"
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

              {/* Desktop horizontal category scroll */}
              <div className="hidden md:block overflow-x-auto hide-scrollbar flex-1">
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

              {/* Current category indicator for mobile */}
              <div className="md:hidden flex-1 text-center">
                <span className="font-medium text-amber-800 px-2 py-1 rounded-lg bg-amber-50">
                  {capitalizeWords(activeCategory)}
                </span>
              </div>
            </div>

            {/* Expanded Category Groups for Desktop */}
            {visibleCategoryGroups && (
              <div className="hidden md:block pt-2 pb-1 border-t border-amber-100 animate-fadeIn mt-2">
                {/* Ensure availableCategoryGroups keys are consistent (lowercase) for iteration */}
                {Object.entries(availableCategoryGroups).map(
                  ([group, categories]) => (
                    <div key={group} className="mb-3 last:mb-0">
                      <h3 className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1.5">
                        {capitalizeWords(group)} {/* Capitalize group name for display */}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              scrollToCategory(category);
                              setVisibleCategoryGroups(false); // Close after selection
                            }}
                            className={`px-3 py-1 text-xs transition-all whitespace-nowrap rounded
                            ${
                              activeCategory === category
                                ? "bg-amber-500 text-white"
                                : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                            }`}
                          >
                            {capitalizeWords(category)}
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

      {/* Mobile Category Navigation Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 bg-amber-900/90 z-40 overflow-y-auto md:hidden animate-fadeIn">
          <div className="max-w-lg mx-auto px-6 py-8">
            <div className="flex justify-end mb-6">
              <button
                onClick={toggleMobileNav}
                className="text-white hover:text-amber-200 p-1"
              >
                <X size={28} />
              </button>
            </div>

            <h2 className="text-white text-lg font-serif mb-6 border-b border-amber-700 pb-2">
              Menu Categories
            </h2>

            <div className="space-y-6">
              {Object.entries(availableCategoryGroups).map(
                ([group, categories]) => (
                  <div key={group}>
                    <h3 className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-3">
                      {capitalizeWords(group)} {/* Capitalize group name for display */}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            scrollToCategory(category);
                            setMobileNavOpen(false); // Explicitly close mobile nav on category click
                          }}
                          className={`px-3 py-2 text-sm font-medium transition-all whitespace-nowrap rounded-lg text-left
                            ${
                              activeCategory === category
                                ? "bg-amber-700 text-white border border-amber-500"
                                : "bg-amber-800/60 text-amber-200 hover:bg-amber-800"
                            }`}
                        >
                          {capitalizeWords(category)}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-6 md:py-10">
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
          <div className="flex flex-col items-center justify-center py-12 md:py-16">
            <div className="w-14 h-14 md:w-16 md:h-16 relative">
              <div className="absolute inset-0 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
              <div className="absolute inset-3 border-2 border-amber-100 border-b-amber-400 rounded-full animate-spin-slow"></div>
            </div>
            <p className="mt-6 text-amber-800 font-medium text-sm md:text-base">
              Curating the menu...
            </p>
          </div>
        )}

        {/* Empty State */}
        {sortedCategories.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-50 rounded-full flex items-center justify-center mb-5 md:mb-6">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-amber-500"
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
            <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-2">
              Menu Coming Soon
            </h3>
            <p className="text-gray-500 max-w-md text-sm md:text-base">
              Our chefs are carefully crafting a delightful menu experience for
              you.
            </p>
          </div>
        )}

        {/* Menu Categories */}
        <div className="space-y-12 md:space-y-16">
          {sortedCategories.map((category, categoryIndex) => {
            const categoryGroup = findCategoryGroup(category);

            return (
              <div
                key={category}
                ref={(el) => (categoryRefs.current[category] = el)}
                data-category={category}
                className="scroll-mt-20 md:scroll-mt-28"
              >
                <div className="flex flex-col mb-6 md:mb-8">
                  {categoryGroup && (
                    <span className="text-xs uppercase tracking-wider text-amber-600 font-medium mb-1">
                      {categoryGroup}
                    </span>
                  )}
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 md:mr-3"></div>
                    <h2 className="text-xl md:text-2xl font-serif text-gray-800">
                      {capitalizeWords(category)}
                    </h2>
                    <div className="flex-grow h-px bg-gradient-to-r from-amber-300 to-transparent ml-3 md:ml-4"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {menuItems[category]?.map((item) => ( // Use optional chaining for safety
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
          <div className="mt-16 md:mt-20 text-center">
            <div className="inline-flex items-center">
              <div className="h-px w-10 md:w-12 bg-amber-200"></div>
              <div className="mx-3 md:mx-4">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <div className="h-px w-10 md:w-12 bg-amber-200"></div>
            </div>
            <p className="text-amber-800 font-serif italic mt-3 md:mt-4 text-sm md:text-base">Bon Appétit</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;