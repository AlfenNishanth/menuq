import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Star,
  Edit
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { capitalizeWords } from '../../utils/format';
import { updateAvailability } from '../../api/menuItem';

 function MenuCardAdmin({ item, onAddToOrder }) {
  const [expanded, setExpanded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(item.available);
  const navigate = useNavigate();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleToggleAvailability = async () => {
    const newAvailability = !isAvailable;
    try{
    setIsAvailable(newAvailability);
    console.log(item._id);

    await updateAvailability(item._id, newAvailability)
    
}catch(error){
  console.error("Error updating availability:", error.response?.data || error.message); 
  toast.error("Error updating availability. Please try again later.");
  setIsAvailable(!newAvailability); // Revert the state change
}
    
    // Call the parent component's function with updated item
    if (onAddToOrder) {
      onAddToOrder({ ...item, available: newAvailability });
    }
  };

  const handleEditItem = () => {
    // Navigate to the EditMenuItem page with the item ID as a parameter
    navigate(`/edit-menu-item/${item._id}`);
  };

  // Function to truncate text to 200 words
  const truncateText = (text, maxWords = 200) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const {
    name,
    price,
    description,
    imageUrl,
    tags,
    prepTime,
    rating,
    ratingCount,
    spiceLevel
  } = item;

  const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );

  return (
  <div 
      className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border-0 flex flex-col max-w-4xl mx-auto ${!isAvailable ? 'opacity-60' : ''}`}
    >
      <div className="flex">
        <div className="w-42 flex-shrink-0 relative group">
          <img 
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            alt={name} 
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2">
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
              <FireIcon />
              <span className="ml-1">{spiceLevel}</span>
            </span>
          </div>
        </div>

        <div className="flex-grow flex flex-col">
          <div className="p-6 pb-2">
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
              <div className="text-right flex flex-col items-end">
                <span className="text-lg font-medium text-amber-700 block">₹{price}</span>
                <button 
                  onClick={handleEditItem}
                  className="mt-2 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1 cursor-pointer" />
                  <span className="text-sm">Edit</span>
                </button>
              </div>
            </div>
            
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

            {/* Improved Availability Toggle Switch */}
            <div className="mt-4 flex items-center justify-between">
              {/* <span className="text-sm font-medium text-gray-700">{isAvailable? "Available" : "Unavailable"}:</span> */}
              <div className={`mt-2 text-sm font-medium align-top ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {isAvailable ? 'Available' : 'Currently Unavailable'}
            </div>
              <button
                onClick={handleToggleAvailability}
                className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none cursor-pointer"
                aria-pressed={isAvailable}
                type="button"
              >
                <span className={`absolute h-5 w-10 rounded-full transition ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                <span 
                  className={`absolute inset-y-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-all ${isAvailable ? 'translate-x-5' : 'translate-x-0'}`}
                ></span>
              </button>
            </div>
            

          </div>

          <button 
            onClick={toggleExpand}
            className="mt-2 flex items-center justify-center w-full py-2 text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-amber-600 mr-2" />
                <span className="text-xs text-gray-500">Prep Time</span>
              </div>
              <span className="text-sm font-medium">{prepTime}</span>
            </div>
            
            <div className="mt-4">
              {isAvailable ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onAddToOrder && onAddToOrder(item)}
                    className="flex-grow bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-md transition-colors duration-200"
                  >
                    Add to Order
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
      <ToastContainer/>
    </div>
  );
}

export default MenuCardAdmin;