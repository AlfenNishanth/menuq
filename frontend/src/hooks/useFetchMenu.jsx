import axios from "axios";
import React, { useEffect, useState } from "react";

function useFetchMenu(id, pg) {
  
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  


//     useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const q = query(
//           collection(db, "Menu"),
//           where("restaurantID", "==", id)
//         );
//         const querySnapshot = await getDocs(q);

//         const items = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMenuItems(items);
//       } catch (error) {
//         console.error("Error fetching menu:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [id]);

// const pg = 1

useEffect(()=>{
    setMenuItems([])
},[id]);

useEffect(()=>{
    
    setLoading(true);
    setError(false);
    let cancel;

    axios({
        method: 'GET',
        url: 'http://openlibrary.org/search.json',
        params: {q: id, page: pg}, 
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res=>{
        setMenuItems(prevMenu => {
            return [...new Set([...prevMenu, ...res.data.docs.map(b => b.title)])] 
        })
        setHasMore(res.data.docs.length > 0)
        setLoading(false)
        console.log(res.data);
    }).catch(e => {
        if(axios.isCancel(e)) return
        setError(true)
    })

    return () => cancel()

}, [id, pg])

  return {loading, error, menuItems, hasMore};
}

export default useFetchMenu;


/* 
import React, { useRef, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchMenu from "../../hooks/useFetchMenu";

function MenuLayout() {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  
  const { menuItems, hasMore, loading, error } = useFetchMenu(id, pageNumber);

  const observer = useRef();
  const lastMenuRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && hasMore){
            setPageNumber(prev => prev + 1)
        }
      });
      if (node) observer.current.observe(node);
      // console.log(node)
    },
    [loading, hasMore]
  );


  return (
    <>
      {menuItems.map((menu, index) => {
        if (menu.length === index + 1) {
          return (
            <div ref={lastMenuRef} key={menu}>
              {menu}
            </div>
          );
        } else return <div key={menu}>{menu}</div>;
      })}
      <div>{loading && "loading..."}</div>
      {error && <div> {error} </div>}
    </>
  );
}

export default MenuLayout;


*/