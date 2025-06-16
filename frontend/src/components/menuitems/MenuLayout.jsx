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
  MapPin,
  Award,
  Menu as MenuIcon,
  X,
  Search,
  ChevronDown,
  ArrowUpCircle
} from "lucide-react";

// The 'categoryOrder' array is fine as is
const categoryOrder = [
  "breakfast", "brunch", "lunch specials",
  "appetizers", "starter", "soups", "salads",
  "chef's specials", "signature dishes", "main course", "pasta", "pizza", "noodles",
  "rice dishes", "curry", "sushi", "tapas", "sharing platters",
  "sides", "accompaniments", "vegetarian", "vegan", "gluten-free", "kids menu",
  "beverages", "hot beverages", "drinks", "cold beverages", "mocktails",
  "cocktails", "wine list", "beer", "spirits",
  "desserts",
];

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
                  <MapPin size={14} className="inline mr-1.5 md:mr-2" />
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

const RestaurantStatusInfo = ({ restaurantData }) => {
  if (!restaurantData) {
    return null;
  }
  const { resOpen, operatingHours = [] } = restaurantData;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  const todayHours = operatingHours.find((item) => item.day === today);
  const [showAllHours, setShowAllHours] = useState(false);
  const displayedHours = showAllHours ? operatingHours : operatingHours.filter((item) => item.day === today);

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
  const [allFlatMenuItems, setAllFlatMenuItems] = useState([]); // Stores all items in a flat array for search
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [visibleCategoryGroups, setVisibleCategoryGroups] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const [customCategories, setCustomCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigate = useNavigate();
  const categoryRefs = useRef({});
  const menuContainerRef = useRef(null);
  const horizontalNavRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);


  const categoryGroups = {
    "meal options": ["breakfast", "brunch", "lunch specials"],
    starters: ["appetizers", "starter", "soups", "salads"],
    mains: [
      "chef's specials", "signature dishes", "main course", "pasta", "pizza", "noodles",
      "rice dishes", "curry", "sushi", "tapas", "sharing platters",
    ],
    extras: [
      "sides", "accompaniments", "vegetarian", "vegan", "gluten-free", "kids menu",
    ],
    drinks: [
      "beverages", "hot beverages", "drinks", "cold beverages", "mocktails",
      "cocktails", "wine list", "beer", "spirits",
    ],
    desserts: ["desserts"],
  };

  const fetchRestaurantData = async (id) => {
    try {
      setRestaurantLoading(true);
      const data = await fetchRestaurantByID(id);
      if (data && data.redirect === "1") {
        navigate(`/signup/${id}`);
      } else {
        setRestaurantData(data);
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
      setRestaurantData(null);
    } finally {
      setRestaurantLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const items = await getRestaurantMenu(id);

      const groupedItems = {};
      const flatItems = []; // New array to store all items flattened

      if (Array.isArray(items)) {
        items.forEach((item) => {
          const type = item.type ? String(item.type).toLowerCase() : "uncategorized";
          if (!groupedItems[type]) {
            groupedItems[type] = [];
          }
          groupedItems[type].push(item);
          flatItems.push(item); // Add to flat list
        });
      }
      setMenuItems(groupedItems);
      setAllFlatMenuItems(flatItems); // Store the flattened list

      const newCustomCategories = [];
      Object.keys(groupedItems).forEach((itemCategory) => {
        if (
          !categoryOrder.includes(itemCategory) &&
          !customCategories.includes(itemCategory)
        ) {
          newCustomCategories.push(itemCategory);
        }
      });
      if (newCustomCategories.length > 0) {
        setCustomCategories((prev) => [...prev, ...newCustomCategories]);
      }

      // Set active category only if there are items and no search term
      const categories = getSortedCategories(groupedItems);
      if (categories.length > 0 && !searchTerm) {
        setActiveCategory(categories[0]);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      setMenuItems({});
      setAllFlatMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer for active category highlighting
  useEffect(() => {
    // Disable observer if search is active or no menu items
    if (searchTerm || Object.keys(menuItems).length === 0) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -80% 0px", // Adjust these values based on your header height
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only update active category if no search term is active
          setActiveCategory(entry.target.dataset.category);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

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
  }, [menuItems, searchTerm]); // Depend on menuItems and searchTerm

  // Initial data fetch
  useEffect(() => {
    fetchMenuItems();
    fetchRestaurantData(id);
  }, [id]);

  // Handle resize events to close desktop category groups if resized to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && visibleCategoryGroups) {
        setVisibleCategoryGroups(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleCategoryGroups]);

  // Effect to manage "Back to Top" button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (menuContainerRef.current) {
        const scrollTop = menuContainerRef.current.scrollTop;
        setShowBackToTop(scrollTop > 300);
      }
    };

    const currentContainer = menuContainerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (menuContainerRef.current) {
      menuContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Update horizontal scroll shadows based on scroll position
  const updateScrollShadows = useCallback(() => {
    if (horizontalNavRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = horizontalNavRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  }, []);

  // Set up resize and scroll listeners for horizontal nav for shadows
  useEffect(() => {
    const currentNavRef = horizontalNavRef.current;
    if (currentNavRef) {
      currentNavRef.addEventListener('scroll', updateScrollShadows);
      window.addEventListener('resize', updateScrollShadows);
      updateScrollShadows(); // Initial check
    }
    return () => {
      if (currentNavRef) {
        currentNavRef.removeEventListener('scroll', updateScrollShadows);
      }
      window.removeEventListener('resize', updateScrollShadows);
    };
  }, [updateScrollShadows]);

  // Sort categories according to predefined order and include custom categories
  const getSortedCategories = useCallback(
    (items) => {
      const allCategoriesInMenu = Object.keys(items);
      const sorted = [...categoryOrder, ...customCategories].filter((category) =>
        allCategoriesInMenu.includes(category)
      );

      // Add any categories not in the predefined order or custom list
      allCategoriesInMenu.forEach((category) => {
        if (!sorted.includes(category)) {
          sorted.push(category);
        }
      });
      return sorted;
    },
    [customCategories, categoryOrder]
  );

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
  };

  const findCategoryGroup = (category) => {
    for (const [group, categories] of Object.entries(categoryGroups)) {
      if (categories.includes(category.toLowerCase())) {
        return capitalizeWords(group);
      }
    }
    return "Other Categories";
  };

  // --- Search Functionality ---
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setActiveCategory(""); // Clear active category when searching
    if (menuContainerRef.current) {
        menuContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on search
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    // Re-activate first category if menu items exist
    const categories = getSortedCategories(menuItems);
    if (categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  };

  // New logic for filtering items based on search
  const getFilteredAndGroupedItems = useCallback(() => {
    if (!searchTerm) {
      return menuItems; // If no search term, return original grouped items
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredFlatItems = allFlatMenuItems.filter(item => {
      const itemName = String(item.itemName || "").toLowerCase();
      const itemDescription = String(item.itemDescription || "").toLowerCase();
      const itemType = String(item.type || "").toLowerCase(); // Also search in category/type

      return (
        itemName.includes(lowerCaseSearchTerm) ||
        itemDescription.includes(lowerCaseSearchTerm) ||
        itemType.includes(lowerCaseSearchTerm)
      );
    });

    // Regroup filtered items by their original categories
    const newGroupedItems = {};
    filteredFlatItems.forEach(item => {
      const type = item.type ? String(item.type).toLowerCase() : "uncategorized";
      if (!newGroupedItems[type]) {
        newGroupedItems[type] = [];
      }
      newGroupedItems[type].push(item);
    });

    // Sort items within each category by itemName for consistency in search results
    for (const category in newGroupedItems) {
      newGroupedItems[category].sort((a, b) =>
        String(a.itemName).localeCompare(String(b.itemName))
      );
    }

    return newGroupedItems;
  }, [searchTerm, allFlatMenuItems, menuItems]);

  const itemsToDisplay = getFilteredAndGroupedItems();
  const categoriesToDisplay = getSortedCategories(itemsToDisplay);

  // Determine available category groups based on itemsToDisplay
  const availableCategoryGroups = {};
  Object.entries(categoryGroups).forEach(([group, categories]) => {
    const availableCategoriesInGroup = categories.filter((cat) =>
      categoriesToDisplay.includes(cat)
    );
    if (availableCategoriesInGroup.length > 0) {
      availableCategoryGroups[group] = availableCategoriesInGroup;
    }
  });

  const customCategoriesToDisplay = categoriesToDisplay.filter(
    (cat) => !Object.values(categoryGroups).flat().includes(cat)
  );

  // Add custom categories to 'other categories' group if they exist
  if (customCategoriesToDisplay.length > 0) {
    availableCategoryGroups["other categories"] = [
      ...(availableCategoryGroups["other categories"] || []),
      ...customCategoriesToDisplay,
    ].sort((a, b) => a.localeCompare(b));
  }


  return (
    <div className="bg-white overflow-y-auto h-screen" ref={menuContainerRef}>
      {/* Navigation Bar (Sticky at the top) */}
      {categoriesToDisplay.length > 0 && (
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm py-3">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={toggleCategoryGroups}
                className="hidden md:flex text-amber-700 hover:text-amber-900 font-medium items-center flex-shrink-0"
              >
                <span className="mr-1">Categories</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    visibleCategoryGroups ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                ref={horizontalNavRef}
                className={`overflow-x-auto hide-scrollbar flex-1 relative
                  ${canScrollLeft ? 'shadow-left-gradient' : ''}
                  ${canScrollRight ? 'shadow-right-gradient' : ''}`}
                onScroll={updateScrollShadows}
              >
                <div className="flex gap-2">
                  {/* Only show categories that have items in the current view (filtered or full) */}
                  {categoriesToDisplay.map((category) => (
                    <button
                      key={category}
                      onClick={() => scrollToCategory(category)}
                      className={`px-4 py-1.5 text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-full
                        ${
                          activeCategory === category && !searchTerm
                            ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-300 ring-offset-1"
                            : "bg-amber-50 text-amber-900 hover:bg-amber-100"
                        }`}
                    >
                      {capitalizeWords(category)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded Category Groups for Desktop */}
            {visibleCategoryGroups && (
              <div className="hidden md:block pt-2 pb-1 border-t border-amber-100 animate-fadeIn mt-2">
                {Object.entries(availableCategoryGroups).map(
                  ([group, categories]) => (
                    <div key={group} className="mb-3 last:mb-0">
                      <h3 className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-1.5">
                        {capitalizeWords(group)}
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
                                activeCategory === category && !searchTerm
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

      {/* Main Content Area */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-6 md:py-10">
        {/* Restaurant Name Header */}
        {!restaurantLoading && restaurantData && (
          <RestaurantNameHeader restaurantData={restaurantData} />
        )}

        {/* Restaurant Status Banner */}
        {!restaurantLoading && restaurantData && (
          <RestaurantStatusInfo restaurantData={restaurantData} />
        )}

        {/* Search Bar */}
        {(!loading && !restaurantLoading && allFlatMenuItems.length > 0) && (
          <div className="sticky top-[calc(60px)] z-20 bg-white pt-4 pb-2 -mt-4 mb-4 rounded-b-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
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

        {/* Empty State for no menu items (when not loading and no search active) */}
        {allFlatMenuItems.length === 0 && !loading && !restaurantLoading && !searchTerm && (
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

        {/* Empty State for no search results (when search is active) */}
        {searchTerm && Object.keys(itemsToDisplay).length === 0 && !loading && !restaurantLoading && (
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 10a9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 max-w-md text-sm md:text-base">
              We couldn't find any dishes matching "<span className="font-semibold text-amber-700">{searchTerm}</span>". Please try a different search term.
            </p>
            <button
              onClick={clearSearch}
              className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Menu Categories Display (Either full menu or filtered search results) */}
        {Object.keys(itemsToDisplay).length > 0 && !loading && !restaurantLoading && (
          <div className="space-y-12 md:space-y-16">
            {categoriesToDisplay.map((category) => {
              const categoryGroup = findCategoryGroup(category);
              const items = itemsToDisplay[category];

              if (!items || items.length === 0) return null;

              return (
                <div
                  key={category}
                  // Only attach ref and data-category if not searching, to avoid observer interference
                  ref={!searchTerm ? (el) => (categoryRefs.current[category] = el) : null}
                  data-category={!searchTerm ? category : undefined}
                  className="scroll-mt-20 md:scroll-mt-28"
                >
                  <div className="flex flex-col mb-6 md:mb-8">
                    {/* Only show group if not searching or if it's a dedicated search result group */}
                    {categoryGroup && !searchTerm && (
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
                    {items.map((item) => (
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
        )}

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 z-50 flex items-center justify-center animate-fade-in-up"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle size={24} />
          </button>
        )}

        {/* Footer */}
        {Object.keys(itemsToDisplay).length > 0 && !loading && !restaurantLoading && (
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