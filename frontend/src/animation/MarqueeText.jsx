// import { useState, useLayoutEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const MarqueeText = ({ text }) => {
//   const containerRef = useRef(null);
//   const textRef = useRef(null);
//   const [shouldScroll, setShouldScroll] = useState(false);

//   useLayoutEffect(() => {
//     const checkOverflow = () => {
//       if (containerRef.current && textRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const textWidth = textRef.current.scrollWidth;

//         console.log("Container Width:", containerWidth);
//         console.log("Text Width:", textWidth);

//         // Corrected condition: Scroll only if text is longer than container
//         setShouldScroll(textWidth > containerWidth);
//       }
//     };

//     // Delay measurement slightly to ensure accurate sizing
//     const timeout = setTimeout(checkOverflow, 100);

//     return () => clearTimeout(timeout);
//   }, [text]); // Runs when text changes

//   return (
//     <div className="w-[180px] overflow-hidden whitespace-nowrap relative border-2 border-blue-500" ref={containerRef}>
//       {shouldScroll ? (
//         <motion.div
//           className="inline-block"
//           animate={{ x: ["100%", "-100%"] }}
//           transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
//         >
//           {text}
//         </motion.div>
//       ) : (
//         <h4 className="font-semibold inline-block border-2 border-red-500" ref={textRef}>
//           {text}
//         </h4>
//       )}
//     </div>
//   );
// };

// export default MarqueeText;


// import { motion } from "framer-motion";

// const MarqueeText = ({ text }) => {
//   return (
//     <div className="w-full overflow-hidden whitespace-nowrap relative">
//       <motion.div
//         className="inline-block"
//         animate={{ x: ["100%", "-100%"] }}
//         transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
//       >
//         {text}
//       </motion.div>
//     </div>
//   );
// };

// export default MarqueeText;


import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";

const MarqueeText = ({ text }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useLayoutEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;

    //   console.log("Container Width:", containerWidth);
    //   console.log("Text Width:", textWidth);

      // Enable scrolling only if text is wider than the container
      setShouldScroll(textWidth > containerWidth);
    }
  }, []); // Re-run when text changes

  return (
    <div 
//   className="w-full overflow-hidden whitespace-nowrap relative border-2 border-blue-500" 
className="w-[180px] overflow-hidden whitespace-nowrap relative" 
  ref={containerRef}
>
  {shouldScroll ? (
    <motion.div
      className="inline-block"
      animate={{ x: ["100%", "-100%"] }}
      transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
    >
      {text}
    </motion.div>
  ) : (
    <h4 className="font-semibold inline-block " ref={textRef}>
      {text}
    </h4>
  )}
</div>
  );
};

export default MarqueeText;
