import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Star,
  Plus,
  Minus
} from 'lucide-react';
import { capitalizeWords } from '../../utils/format';

function MenuCard({ item, onAddToOrder }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Function to truncate text to 200 words
  const truncateText = (text, maxWords = 200) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  // Check for the correct property name in your backend
  // Log the item to see the actual structure
  console.log("Menu item data:", item);

  const {
    name,
    price,
    description,
    imageUrl,
    tags,
    prepTime,
    rating,
    ratingCount,
    available,
    spiceLevel,
    // Try different possible property names that might be used in your backend
    isVegetarian,
    isVeg,
    vegetarian,
    veg,
    foodType,
    variants,
    addOns
  } = item;

  // Determine if the item is vegetarian using various possible properties
  const isVegItem = isVegetarian || isVeg || vegetarian || (veg === true) || 
                   (foodType === 'veg') || (foodType === 'vegetarian');

  const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );

  // Toggle add-on selection
  const toggleAddOn = (addOn) => {
    setSelectedAddOns(prev => {
      const isSelected = prev.some(item => item.name === addOn.name);
      if (isSelected) {
        return prev.filter(item => item.name !== addOn.name);
      } else {
        return [...prev, addOn];
      }
    });
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = selectedVariant ? selectedVariant.price : price;
    
    // Add selected add-ons prices
    if (selectedAddOns.length > 0) {
      total += selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    }
    
    return total;
  };

  // Handle "Add to Order" with selected variants and add-ons
  const handleAddToOrder = () => {
    if (onAddToOrder) {
      const orderItem = {
        ...item,
        selectedVariant,
        selectedAddOns,
        totalPrice: calculateTotalPrice()
      };
      onAddToOrder(orderItem);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border-0 flex flex-col max-w-4xl mx-auto ${!available ? 'opacity-60' : ''}`}
    >
      <div className="flex">
        <div className="w-42 flex-shrink-0 relative group">
          <img 
            className="w-full h-46 object-cover transition-transform duration-300 group-hover:scale-105"
            src={item.imageUrl !== "" ? item.imageUrl : 
              "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"}
            alt={name} 
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2">
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
              <FireIcon />
              <span className="ml-1">{spiceLevel}</span>
            </span>
          </div>
          
          {/* Simplified Veg/Non-Veg indicator */}
          <div className="absolute top-2 right-2">
  <div 
    className={`w-4 h-4 flex items-center justify-center ${isVegItem ? 'border-2 border-green-600' : 'border-2 border-red-600'}`}
  >
    {isVegItem ? (
      <div className="w-2 h-2 rounded-full bg-green-600"></div>
    ) : (
      <svg width="12" height="12" viewBox="0 0 12 12" className="fill-red-600">
        <polygon points="6,2 10,10 2,10" />
      </svg>
    )}
  </div>
</div>
        </div>

        <div className="flex-grow flex flex-col">
          <div className="p-6 pb-0">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-grow pr-4">
                <h2 className="text-xl font-serif tracking-wide">{capitalizeWords(name)}</h2>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-amber-500 mr-1" />
                  <span className="text-sm text-gray-600">
                    {rating} ({ratingCount} reviews)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-medium text-amber-700 block">₹{price}</span>
              </div>
            </div>
            
            {/* you can see the description in the top of menu card */}
            {/* <p className="text-gray-600 mb-4 line-clamp-2">{truncateText(description)}</p> */}  
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs bg-amber-50 text-amber-800 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className={`mt-2 text-sm font-medium ${available ? 'text-green-600' : 'text-red-600'}`}>
              {available ? 'Available' : 'Currently Unavailable'}
            </div>
          </div>

          <button 
            onClick={toggleExpand}
            className="mt-4 flex items-center justify-center w-full py-2 text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium"
          >
            {expanded ? (
              <>Show Less <ChevronUp className="ml-1 w-4 h-4" /></>
            ) : (
              <>View Details <ChevronDown className="ml-1 w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="w-full p-6 pt-0">
          <div className="border-t border-gray-100 pt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">About the Dish</h3>
              <p className="text-gray-600">{description}</p>
              {/* <p className="text-gray-600 mt-1 font-medium">  //can see in expand button veg or non veg
                {isVegItem ? '🟢 Vegetarian' : '🔴 Non-Vegetarian'}
              </p> */}
            </div>

            {/* Variants Section */}
            {variants && variants.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Variants</h3>
                <div className="grid grid-cols-1 gap-2">
                  {/* Default variant option */}
                  <div 
                    className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${selectedVariant === null ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                    onClick={() => setSelectedVariant(null)}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border ${selectedVariant === null ? 'border-amber-600 bg-amber-600' : 'border-gray-400'}`}>
                        {selectedVariant === null && <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>}
                      </div>
                      <span className="ml-2 text-sm font-medium">Regular</span>
                    </div>
                    <span className="font-medium text-gray-800">₹{price}</span>
                  </div>
                  
                  {variants.map((variant, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${selectedVariant?.name === variant.name ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border ${selectedVariant?.name === variant.name ? 'border-amber-600 bg-amber-600' : 'border-gray-400'}`}>
                          {selectedVariant?.name === variant.name && <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>}
                        </div>
                        <span className="ml-2 text-sm font-medium">{capitalizeWords(variant.name)}</span>
                      </div>
                      <span className="font-medium text-gray-800">₹{variant.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons Section */}
            {addOns && addOns.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Add-ons</h3>
                <div className="grid grid-cols-1 gap-2">
                  {addOns.map((addOn, index) => {
                    const isSelected = selectedAddOns.some(item => item.name === addOn.name);
                    return (
                      <div 
                        key={index}
                        className={`flex justify-between items-center p-3 rounded-md cursor-pointer border ${isSelected ? 'border-amber-600 bg-amber-50' : 'border-gray-200 hover:border-amber-300'}`}
                        onClick={() => toggleAddOn(addOn)}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded flex justify-center items-center ${isSelected ? 'bg-amber-600 text-white' : 'border border-gray-400'}`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span className="ml-2 text-sm font-medium">{capitalizeWords(addOn.name)}</span>
                        </div>
                        <span className="font-medium text-gray-800">+₹{addOn.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-amber-600 mr-2" />
                <span className="text-xs text-gray-500">Prep Time</span>
              </div>
              <span className="text-sm font-medium">{prepTime}</span>
            </div>
            
            <div className="mt-4">
              {available ? (
                <div className="flex space-x-2">
                  {/* New button that uses the selected variants and add-ons */}
                  <button 
                    onClick={handleAddToOrder}
                    className="flex-grow bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-md transition-colors duration-200"
                  >
                    Add to Order • ₹{calculateTotalPrice()}
                  </button>
                </div>
              ) : (
                <div className="bg-red-100 text-red-600 py-2 text-center text-sm rounded-md">
                  Sorry, this item is currently unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Check component to use with add-ons selection
const Check = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default MenuCard;