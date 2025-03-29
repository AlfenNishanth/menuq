import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../fireabse/firebase";
import { collection, query, where, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import MenuCard from "./MenuCard";
import { motion } from "framer-motion";

const PAGE_SIZE = 6;
const categoryOrder = ["Starter", "Main Course", "Drinks", "Cold Beverages", "Desserts"];

const RestaurantMenu = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const observer = useRef();
  const menuRef = useRef(null);

  const fetchMenuItems = async (initial = false) => {
    try {
      setLoading(true);
      let q = query(
        collection(db, "Menu"),
        where("restaurantID", "==", id),
        orderBy("type"),
        orderBy("name"),
        limit(PAGE_SIZE)
      );

      if (!initial && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);

      const response = await fetch(`http://localhost:3000/menu/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
  
      const items = await response.json();

      const groupedItems = initial ? {} : { ...menuItems };
      items.forEach(item => {
        if (!groupedItems[item.type]) {
          groupedItems[item.type] = [];
        }
        groupedItems[item.type].push(item);
      });

      setMenuItems(groupedItems);
      
      // Set the first category as active if it's the initial load and we have categories
      if (initial && Object.keys(groupedItems).length > 0) {
        const firstCategory = getSortedCategories(groupedItems)[0];
        setActiveCategory(firstCategory);
      }
      
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(querySnapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchMenuItems(true);
  }, [id]);

  const scrollToCategory = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMenuItems();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const sortedCategories = getSortedCategories(menuItems);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      {/* Category Navigation */}
      {sortedCategories.length > 0 && (
        <div className="mb-12">
          <div className="flex overflow-x-auto pb-4 hide-scrollbar snap-x">
            <div className="flex space-x-2 mx-auto">
              {sortedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className={`px-6 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all snap-start ${
                    activeCategory === category
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-amber-50 text-amber-900 hover:bg-amber-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No items message */}
      {sortedCategories.length === 0 && !loading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl text-gray-600">Our chefs are preparing something special.</p>
          <p className="text-gray-500">No menu items are available at the moment.</p>
        </motion.div>
      )}

      {/* Menu Categories */}
      <div className="space-y-16" ref={menuRef}>
        {sortedCategories.map((category) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            key={category}
            id={`category-${category}`}
            className="scroll-mt-32"
          >
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-serif text-gray-800">{category}</h2>
              <div className="ml-4 h-px bg-amber-200 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems[category].map((item, idx) => (
                <MenuCard
                  key={item._id}
                  item={item}
                  refProp={(idx === menuItems[category].length - 1 && sortedCategories[sortedCategories.length - 1] === category) ? lastItemRef : null}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading & No more items indicators */}
      {loading && (
        <div className="flex justify-center mt-10">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>
        </div>
      )}
      
      {!hasMore && !loading && sortedCategories.length > 0 && (
        <div className="text-center mt-12 text-gray-500 italic font-serif">
          <p>Bon Appétit</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;