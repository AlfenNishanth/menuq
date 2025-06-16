import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Edit,
  X,
  Settings,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { capitalizeWords } from '../../utils/format';
import { updateAvailability, updatePrepTime, deleteMenuItem } from '../../api/menuItem';

function MenuCardAdmin({ item, onAddToOrder, showSuccessToast, showErrorToast, onItemDeleted, onRefresh }) {
  const [expanded, setExpanded] = useState(false);
  const [isAvailable, setIsAvailable] = useState(item.available);
  const [isEditingPrepTime, setIsEditingPrepTime] = useState(false);
  const [prepTimeValue, setPrepTimeValue] = useState(item.prepTime == 0 ? '-' : item.prepTime);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // For smooth removal animation
  const navigate = useNavigate();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleToggleAvailability = async () => {
    const newAvailability = !isAvailable;
    try {
      setIsAvailable(newAvailability);
      console.log(item._id);

      await updateAvailability(item._id, newAvailability);
      
      // Show appropriate toast message with correct styling
      if (newAvailability) {
        showSuccessToast(`Item is now available`);
      } else {
        // Use showErrorToast for unavailable to get red styling
        showErrorToast(`Item is now unavailable`);
      }
    } catch(error) {
      console.error("Error updating availability:", error.response?.data || error.message); 
      showErrorToast("Error updating availability. Please try again later.");
      setIsAvailable(!newAvailability); // Revert the state change
    }
    
    // Call the parent component's function with updated item
    if (onAddToOrder) {
      onAddToOrder({ ...item, available: newAvailability });
    }
  };

  const handleEditPrepTime = () => {
    setIsEditingPrepTime(true);
  };

  const handleSavePrepTime = async () => {
    try {
      // Parse the prepTimeValue to a number
      const prepTimeNumber = parseInt(prepTimeValue, 10);
      
      // Validate that it's a valid number
      if (isNaN(prepTimeNumber)) {
        showErrorToast("Prep time must be a valid number");
        return;
      }
      
      console.log(`Attempting to update prep time for ${item._id} to ${prepTimeNumber}`);
      
      const result = await updatePrepTime(item._id, prepTimeNumber);
      console.log('Update result:', result);
      
      setIsEditingPrepTime(false);
      showSuccessToast("Prep time updated successfully!");
    } catch (error) {
      console.error("Error updating prep time:", error);
      showErrorToast("Error updating prep time. Please try again later.");
      setPrepTimeValue(item.prepTime); // Revert to original value
    }
  };

  const handleCancelEditPrepTime = async () => {
    setPrepTimeValue('-'); 
    setIsEditingPrepTime(false);
    const result = await updatePrepTime(item._id, 0);
  };

  const handleEditItem = () => {
    navigate(`/dashboard/edit-menu-item/${item._id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      console.log("Attempting to delete menu item with ID:", item._id);
      const result = await deleteMenuItem(item._id);
      console.log("Delete result:", result);
      
      showSuccessToast(`"${capitalizeWords(item.name)}" has been deleted successfully`);
      
      // Add smooth removal animation
      setIsHidden(true);
      
      // Wait for animation to complete before calling parent callback
      setTimeout(() => {
        // Call parent callback to remove item from the list
        if (onItemDeleted) {
          onItemDeleted(item._id);
        }
      }, 300); // Match this with the transition duration
      
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting menu item:", error.response?.data || error.message);
      showErrorToast(`Failed to delete menu item: ${error.response?.data?.message || error.message || 'Please try again.'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
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
    spiceLevel
  } = item;

  const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );

  return (
    <>
      <div 
        className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white border-0 flex flex-col w-full max-w-4xl mx-auto ${!isAvailable ? 'opacity-60' : ''} ${isHidden ? 'opacity-0 transform scale-95 translate-y-4' : 'opacity-100 transform scale-100 translate-y-0'}`}
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-64 flex-shrink-0 relative group">
            <img 
              className="w-full h-56 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
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
            <div className="p-4 md:p-6 pb-2 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 w-full">
                <div className="flex-grow">
                  <h2 className="text-2xl font-serif tracking-wide">{capitalizeWords(name)}</h2>
                </div>
                <div className="text-right flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                  <span className="text-xl font-medium text-amber-700 block mb-3">₹{price}</span>
                  
                  {/* Action Buttons Container */}
                  <div className="flex flex-col xs:flex-row gap-1.5 w-full xs:w-auto">
                    <button 
                      onClick={handleEditItem}
                      className="inline-flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    
                    <button 
                      onClick={handleDeleteClick}
                      disabled={isDeleting}
                      className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              </div>
              
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
              <div className="mt-4 flex items-center justify-between w-full">
                <div className={`text-base font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? 'Available' : 'Currently Unavailable'}
                </div>
                <button
                  onClick={handleToggleAvailability}
                  className="relative inline-flex h-6 w-12 items-center rounded-full focus:outline-none cursor-pointer"
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
              className="mt-4 flex items-center justify-center w-full py-3 text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-base"
            >
              {expanded ? (
                <>Show Less <ChevronUp className="ml-1 w-5 h-5" /></>
              ) : (
                <>View Details <ChevronDown className="ml-1 w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>
        
        
        {expanded && (
          <div className="w-full p-4 md:p-6 pt-0">
            <div className="border-t border-gray-100 pt-4 space-y-4">
              <div>
                <h3 className="text-base font-medium text-gray-700 mb-2">About the Dish</h3>
                <p className="text-gray-600 text-sm md:text-base">{description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-amber-600 mr-2" />
                  <span className="text-sm text-gray-500">Prep Time</span>
                </div>
                
                {isEditingPrepTime ? (
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      value={prepTimeValue}
                      onChange={(e) => setPrepTimeValue(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-16 md:w-24"
                      placeholder="Minutes"
                      min="0"
                    />
                    <button 
                      onClick={handleSavePrepTime}
                      className="text-green-600 hover:text-green-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                    </button>
                    <button 
                      onClick={handleCancelEditPrepTime}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{prepTimeValue} mins</span>
                    <button 
                      onClick={handleEditPrepTime}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                {isAvailable ? (
                  <div className="flex space-x-2">
                    {/* <button 
                      onClick={() => onAddToOrder && onAddToOrder(item)}
                      className="flex-grow bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-md transition-colors duration-200"
                    >
                      Add to Order
                    </button> */}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Menu Item
              </h3>
              
              <p className="text-gray-600 text-center mb-2">
                Are you sure you want to delete
              </p>
              
              <p className="text-gray-900 font-medium text-center mb-6">
                "{capitalizeWords(name)}"?
              </p>
              
              <p className="text-sm text-gray-500 text-center mb-6">
                This action cannot be undone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuCardAdmin;