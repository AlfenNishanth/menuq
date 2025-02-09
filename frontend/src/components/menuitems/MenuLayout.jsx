import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../fireabse/firebase";
import { collection, query, where, orderBy, limit, getDocs, startAfter } from "firebase/firestore";

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
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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

      {sortedCategories.map(category => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems[category].map((item, index) => (
              <div
                key={item.id}
                ref={index === menuItems[category].length - 1 ? lastItemRef : null}
                className="border p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description || "No description available"}</p>
                <p className="mt-2 font-semibold">₹{item.price || "N/A"}</p>
              </div>
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
