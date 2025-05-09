import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Check, X, Edit, Trash, Plus } from 'lucide-react';
import axios from 'axios'; // Make sure axios is imported
import { 
  updateRestaurantStatus, 
  updateDayOperatingHours, 
  deleteDayOperatingHours 
} from '../api/restaurant'; // Update with your actual path

const RestaurantStatusPanel = ({ restaurant: initialRestaurant, onUpdate }) => {
  const [restaurant, setRestaurant] = useState(initialRestaurant || {});
  
  const [isOpen, setIsOpen] = useState(restaurant?.resOpen || false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [operatingHours, setOperatingHours] = useState(restaurant?.operatingHours || []);
  const [editingDay, setEditingDay] = useState(null);
  const [newHours, setNewHours] = useState("");
  const [addingNewDay, setAddingNewDay] = useState(false);
  const [newDay, setNewDay] = useState("Monday");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Effect to update local state when restaurant prop changes
  useEffect(() => {
    if (initialRestaurant) {
      setRestaurant(initialRestaurant);
      setIsOpen(initialRestaurant.resOpen || false);
      setOperatingHours(initialRestaurant.operatingHours || []);
    }
  }, [initialRestaurant]);

  // Handle toggling restaurant open/closed status
  const handleStatusToggle = async () => {
    if (!restaurant || !restaurant.firebaseUID) {
      setError("Restaurant data is missing. Please refresh the page.");
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      const newStatus = !isOpen;
      
      const updatedRestaurant = await updateRestaurantStatus(
        restaurant.firebaseUID, 
        newStatus
      );
      
      setIsOpen(newStatus);
      setRestaurant(updatedRestaurant);
      
      // If there's an onUpdate callback, call it with the updated restaurant
      if (onUpdate) {
        onUpdate(updatedRestaurant);
      }
    } catch (err) {
      setError("Failed to update restaurant status. Please try again.");
      console.error("Status update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Start editing hours for a specific day
  const handleEditHours = (day, currentHours) => {
    setEditingDay(day);
    setNewHours(currentHours);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingDay(null);
    setNewHours("");
    setAddingNewDay(false);
  };

  // Save updated hours for a day
  const handleSaveHours = async (day) => {
    if (!restaurant || !restaurant.firebaseUID) {
      setError("Restaurant data is missing. Please refresh the page.");
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      
      const updatedRestaurant = await updateDayOperatingHours(
        restaurant.firebaseUID,
        day,
        newHours
      );
      
      // Update local state with the new hours
      const updatedHours = updatedRestaurant.operatingHours || [];
      setOperatingHours(updatedHours);
      setRestaurant(updatedRestaurant);
      
      // If there's an onUpdate callback, call it with the updated restaurant
      if (onUpdate) {
        onUpdate(updatedRestaurant);
      }
      
      // Reset form
      setEditingDay(null);
      setNewHours("");
    } catch (err) {
      setError(`Failed to update hours for ${day}. Please try again.`);
      console.error("Hours update error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete hours for a day
  const handleDeleteHours = async (day) => {
    if (!restaurant || !restaurant.firebaseUID) {
      setError("Restaurant data is missing. Please refresh the page.");
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      
      const updatedRestaurant = await deleteDayOperatingHours(
        restaurant.firebaseUID,
        day
      );
      
      // Update local state with the new hours
      const updatedHours = updatedRestaurant.operatingHours || [];
      setOperatingHours(updatedHours);
      setRestaurant(updatedRestaurant);
      
      // If there's an onUpdate callback, call it with the updated restaurant
      if (onUpdate) {
        onUpdate(updatedRestaurant);
      }
    } catch (err) {
      setError(`Failed to delete hours for ${day}. Please try again.`);
      console.error("Hours delete error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle adding new day hours
  const handleAddDay = async () => {
    if (!restaurant || !restaurant.firebaseUID) {
      setError("Restaurant data is missing. Please refresh the page.");
      return;
    }

    try {
      // Check if day already exists
      const existingDay = operatingHours.find(item => item.day === newDay);
      if (existingDay) {
        setError(`Hours for ${newDay} already exist. Please edit them instead.`);
        return;
      }
      
      setIsUpdating(true);
      setError("");
      
      const updatedRestaurant = await updateDayOperatingHours(
        restaurant.firebaseUID,
        newDay,
        newHours
      );
      
      // Update local state with the new hours
      const updatedHours = updatedRestaurant.operatingHours || [];
      setOperatingHours(updatedHours);
      setRestaurant(updatedRestaurant);
      
      // If there's an onUpdate callback, call it with the updated restaurant
      if (onUpdate) {
        onUpdate(updatedRestaurant);
      }
      
      // Reset form
      setAddingNewDay(false);
      setNewDay("Monday");
      setNewHours("");
    } catch (err) {
      setError(`Failed to add hours for ${newDay}. Please try again.`);
      console.error("Add hours error:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Check if a day already has hours set
  const isDaySet = (day) => {
    return operatingHours.some(item => item.day === day);
  };

  // Get hours for a specific day
  const getHoursForDay = (day) => {
    const dayData = operatingHours.find(item => item.day === day);
    return dayData ? dayData.hours : "Closed";
  };

  // Show loading state if restaurant data is not available yet
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100 h-full">
        <h2 className="text-xl font-semibold text-amber-800 mb-6">Restaurant Status & Hours</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-amber-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
      <h2 className="text-xl font-semibold text-amber-800 mb-6">Restaurant Status & Hours</h2>
      
      {/* Error message display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-4">
          <div className="flex items-center">
            <X className="text-red-500 mr-2" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {/* Restaurant Open/Closed Toggle */}
      <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-amber-800 mb-1">Current Status</h3>
            <div className="flex items-center">
               <div className={`w-3 h-3 rounded-full mr-2 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
               <p className={`text-lg font-semibold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                 {isOpen ? 'OPEN' : 'CLOSED'}
               </p>
            </div>
          </div>
          <button
            className={`px-4 py-2 rounded-lg transition duration-150 flex items-center ${
              isOpen 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
            onClick={handleStatusToggle}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                Updating...
              </span>
            ) : (
              <span className="flex items-center">
                {isOpen ? <X size={16} className="mr-2" /> : <Check size={16} className="mr-2" />}
                {isOpen ? 'Mark as Closed' : 'Mark as Open'}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <hr className="my-6 border-amber-100" />
      
      {/* Operating Hours Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar size={18} className="text-amber-600 mr-2" />
            <h3 className="font-medium text-amber-800">Operating Hours</h3>
          </div>
          {!addingNewDay && (
            <button
              className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center"
              onClick={() => setAddingNewDay(true)}
            >
              <Plus size={16} className="mr-1" /> Add Day
            </button>
          )}
        </div>
        
        {/* Add New Day Form */}
        {addingNewDay && (
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
            <h4 className="font-medium mb-2 text-amber-800">Add New Day</h4>
            <div className="flex flex-col md:flex-row gap-2">
              <select
                className="p-2 border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day} disabled={isDaySet(day)}>
                    {day} {isDaySet(day) ? '(Already Set)' : ''}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="p-2 border border-amber-200 rounded-lg bg-white flex-grow focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
                placeholder="e.g. 10:00 AM - 9:00 PM"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center"
                  onClick={handleAddDay}
                  disabled={isUpdating || !newHours.trim()}
                >
                  {isUpdating ? (
                    <span className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Check size={16} className="mr-1" /> Save
                    </span>
                  )}
                </button>
                <button
                  className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-150"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Hours List */}
        <div className="bg-amber-50 rounded-lg overflow-hidden border border-amber-200">
          <table className="w-full">
            <thead className="bg-amber-100">
              <tr>
                <th className="text-left p-3 text-amber-800">Day</th>
                <th className="text-left p-3 text-amber-800">Hours</th>
                <th className="text-right p-3 text-amber-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map(day => {
                const hasHours = isDaySet(day);
                const hours = getHoursForDay(day);
                const isEditing = editingDay === day;
                
                return (
                  <tr key={day} className="border-t border-amber-200">
                    <td className="p-3 font-medium text-amber-900">{day}</td>
                    <td className="p-3">
                      {isEditing ? (
                        <input
                          type="text"
                          className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
                          value={newHours}
                          onChange={(e) => setNewHours(e.target.value)}
                          placeholder="e.g. 10:00 AM - 9:00 PM"
                        />
                      ) : (
                        <span className={hasHours ? 'text-amber-900' : 'text-amber-600 italic'}>
                          {hours}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      {isEditing ? (
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center"
                            onClick={() => handleSaveHours(day)}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <span className="flex items-center">
                                <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-1"></div>
                                Saving...
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <Check size={14} className="mr-1" /> Save
                              </span>
                            )}
                          </button>
                          <button
                            className="px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-150"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          {hasHours && (
                            <>
                              <button
                                className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center"
                                onClick={() => handleEditHours(day, hours)}
                              >
                                <Edit size={14} className="mr-1" /> Edit
                              </button>
                              <button
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 flex items-center"
                                onClick={() => handleDeleteHours(day)}
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  <span className="flex items-center">
                                    <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-1"></div>
                                    <span>Deleting...</span>
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <Trash size={14} className="mr-1" /> Delete
                                  </span>
                                )}
                              </button>
                            </>
                          )}
                          {!hasHours && (
                            <button
                              className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center"
                              onClick={() => {
                                setEditingDay(day);
                                setNewHours("10:00 AM - 9:00 PM");
                              }}
                            >
                              <Plus size={14} className="mr-1" /> Add Hours
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantStatusPanel;