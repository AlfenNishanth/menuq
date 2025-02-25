import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../fireabse/firebase";
import { collection, query, where, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import MenuCard from "./MenuCard";

const PAGE_SIZE = 6;
const categoryOrder = ["Starter", "Main Course", "Drinks", "Cold Beverages", "Desserts"];

const RestaurantMenu = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

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
      // const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const response = await fetch(`http://localhost:3000/menu/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
  
      const items = await response.json();

      console.log(items)

      const groupedItems = initial ? {} : { ...menuItems };
      items.forEach(item => {
        if (!groupedItems[item.type]) {
          groupedItems[item.type] = [];
        }
        groupedItems[item.type].push(item);
      });

      setMenuItems(groupedItems);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(querySnapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems(true);
  }, [id]);


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

  // ✅ Sort categories before rendering
  const sortedCategories = Object.keys(menuItems).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB; // Sort predefined categories
    if (indexA !== -1) return -1; // Show predefined categories first
    if (indexB !== -1) return 1; // Custom categories come later
    return a.localeCompare(b); // Alphabetical order for custom categories
  });


  return (
    <div className="p-6">
      {sortedCategories.length === 0 && !loading && (
        <p className="text-center">No menu items available.</p>
      )}

      {sortedCategories.map((category, index) => (
        
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{category}</h2>
        
          {/* <div className="max-w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16"> */}
          <div className="flex flex-wrap gap-8 justify-center items-start max-w-screen-xl mx-auto"> 

            {menuItems[category].map((item) => (
              <MenuCard
                key={item._id}
                item={item}
                refProp={index === menuItems[category].length - 1 ? lastItemRef : null}/>
            ))}
          </div>
        </div>
      ))}

      {loading && <p className="text-center">Loading more...</p>}
      {!hasMore && !loading && <p className="text-center col-span-full">No more items</p>}
    </div>
  );
};

export default RestaurantMenu;
