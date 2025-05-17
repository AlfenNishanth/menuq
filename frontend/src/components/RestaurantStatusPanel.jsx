import React, { useState, useEffect } from "react";
import { Clock, Calendar, Check, X, Edit, Trash, Plus } from "lucide-react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import {
  updateRestaurantStatus,
  updateDayOperatingHours,
  updateAllOperatingHours,
  deleteDayOperatingHours,
} from "../api/restaurant";

const RestaurantStatusPanel = ({ restaurant: initialRestaurant, onUpdate }) => {
  const [restaurant, setRestaurant] = useState(initialRestaurant || {});
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [operatingHours, setOperatingHours] = useState([]);
  const [editingDay, setEditingDay] = useState(null);
  const [newHours, setNewHours] = useState("");
  const [addingNewDay, setAddingNewDay] = useState(false);
  const [newDay, setNewDay] = useState("Monday");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser, userData, updateUserData } = useAuth();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Fetch restaurant data on component mount if not provided
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        if (!currentUser || !currentUser.uid) {
          setError("User not authenticated. Please login again.");
          setIsLoading(false);
          return;
        }

        // Use the userData directly if it contains restaurant info
        if (userData && Object.keys(userData).length > 0) {
          console.log("Using userData from context:", userData);
          setRestaurant({
            ...userData,
            firebaseUID: userData.firebaseUid || currentUser.uid,
          });
          setIsOpen(userData.resOpen || false);
          setOperatingHours(userData.operatingHours || []);
          setError("");
          setIsLoading(false);
          return;
        }

        // If userData doesn't exist or is empty, fetch it from API
        const firebaseUID = currentUser.uid;
        console.log("Fetching restaurant data for UID:", firebaseUID);

        // Fetch restaurant data
        // const response = await axios.get(`${config.MENUQ}/${firebaseUID}`);
        // console.log("API response:", response.data);

        // Make sure firebaseUID is included in the restaurant data
        // const restaurantData = {
        //   ...response.data,
        //   firebaseUID: firebaseUID,
        // };

        setRestaurant(userData);
        setIsOpen(restaurantData.resOpen || false);
        setOperatingHours(restaurantData.operatingHours || []);
        setError("");
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError(
          "Failed to load restaurant data. " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setIsLoading(false);
      }
    };

    // If restaurant data is provided through props, use it
    if (initialRestaurant && initialRestaurant.firebaseUID) {
      console.log("Using initialRestaurant from props:", initialRestaurant);
      setRestaurant(initialRestaurant);
      setIsOpen(initialRestaurant.resOpen || false);
      setOperatingHours(initialRestaurant.operatingHours || []);
      setIsLoading(false);
    } else {
      // Otherwise fetch it
      fetchRestaurantData();
    }
  }, [initialRestaurant, currentUser, userData]);

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

      console.log("Toggling status for restaurant:", restaurant.firebaseUID);
      console.log("New status will be:", newStatus);

      const updatedRestaurant = await updateRestaurantStatus(
        restaurant.firebaseUID,
        newStatus
      );

      updateUserData();

      console.log("Status update successful:", updatedRestaurant);
      setIsOpen(newStatus);
      setRestaurant(updatedRestaurant);

      // If there's an onUpdate callback, call it with the updated restaurant
      if (onUpdate) {
        onUpdate(updatedRestaurant);
      }
    } catch (err) {
      console.error("Status update error details:", err);
      setError(
        err.message || "Failed to update restaurant status. Please try again."
      );
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

      console.log(`Saving hours for ${day}:`, newHours);

      const updatedRestaurant = await updateDayOperatingHours(
        restaurant.firebaseUID,
        day,
        newHours
      );

      console.log("Hours update successful:", updatedRestaurant);
      updateUserData();
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
      console.error(`Hours update error for ${day}:`, err);
      setError(
        err.message || `Failed to update hours for ${day}. Please try again.`
      );
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

      console.log(`Deleting hours for ${day}`);

      const updatedRestaurant = await deleteDayOperatingHours(
        restaurant.firebaseUID,
        day
      );
      updateUserData();
      console.log("Hours deletion successful:", updatedRestaurant);

      // Update local state with the new hours
      const updatedHours = updatedRestaurant.operatingHours || [];
      setOperatingHours(updatedHours);
      setRestaurant(updatedRestaurant);

      // If there's an onUpdate callback, call it with the updated restaurant
      if (onUpdate) {
        onUpdate(updatedRestaurant);
      }
    } catch (err) {
      console.error(`Hours delete error for ${day}:`, err);
      setError(
        err.message || `Failed to delete hours for ${day}. Please try again.`
      );
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
      const existingDay = operatingHours.find((item) => item.day === newDay);
      if (existingDay) {
        setError(
          `Hours for ${newDay} already exist. Please edit them instead.`
        );
        return;
      }

      setIsUpdating(true);
      setError("");

      console.log(`Adding hours for ${newDay}:`, newHours);

      const updatedRestaurant = await updateDayOperatingHours(
        restaurant.firebaseUID,
        newDay,
        newHours
      );

      console.log("Add hours successful:", updatedRestaurant);

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
      console.error(`Add hours error for ${newDay}:`, err);
      setError(
        err.message || `Failed to add hours for ${newDay}. Please try again.`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Check if a day already has hours set
  const isDaySet = (day) => {
    return operatingHours.some((item) => item.day === day);
  };

  // Get hours for a specific day
  const getHoursForDay = (day) => {
    const dayData = operatingHours.find((item) => item.day === day);
    return dayData ? dayData.hours : "Closed";
  };

  // Show loading state if restaurant data is still being loaded
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100 h-full">
        <h2 className="text-xl font-semibold text-amber-800 mb-6">
          Restaurant Status & Hours
        </h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-amber-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100 h-full">
      <h2 className="text-xl font-semibold text-amber-800 mb-6">
        Restaurant Status & Hours
      </h2>

      {/* Error message display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-4">
          <div className="flex items-center">
            <X className="text-red-500 mr-2" size={20} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* If restaurant data is missing, show a different UI */}
      {!restaurant || !restaurant.firebaseUID ? (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-center">
          <p className="text-amber-800 mb-4">
            Restaurant data is not available or you're not logged in.
          </p>
          <div className="flex justify-center gap-2">
            <button
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Restaurant Open/Closed Toggle */}
          <div className="mb-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-medium text-amber-800 mb-1">
                  Current Status
                </h3>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      isOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <p
                    className={`text-lg font-semibold ${
                      isOpen ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOpen ? "OPEN" : "CLOSED"}
                  </p>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg transition duration-150 flex items-center w-full sm:w-auto justify-center ${
                  isOpen
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-amber-600 hover:bg-amber-700 text-white"
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
                    {isOpen ? (
                      <X size={16} className="mr-2" />
                    ) : (
                      <Check size={16} className="mr-2" />
                    )}
                    {isOpen ? "Mark as Closed" : "Mark as Open"}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Operating Hours Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar size={18} className="text-amber-600 mr-2" />
                <h3 className="font-medium text-amber-800">Operating Hours</h3>
              </div>
              {/* {!addingNewDay && (
                <button
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center"
                  onClick={() => setAddingNewDay(true)}
                >
                  <Plus size={16} className="mr-1" /> Add Day
                </button>
              )} */}
            </div>

            {/* Add New Day Form */}
            {addingNewDay && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                <h4 className="font-medium mb-2 text-amber-800">Add New Day</h4>
                <div className="flex flex-col gap-2">
                  <select
                    className="p-2 border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day} disabled={isDaySet(day)}>
                        {day} {isDaySet(day) ? "(Already Set)" : ""}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="p-2 border border-amber-200 rounded-lg bg-white focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
                    placeholder="e.g. 10:00 AM - 10:00 PM"
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

            {/* Hours List - Simplified for mobile */}
            <div className="bg-amber-50 rounded-lg overflow-hidden border border-amber-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-amber-100">
                    <tr>
                      <th className="text-left p-3 text-amber-800 w-1/4">
                        Day
                      </th>
                      <th className="text-left p-3 text-amber-800">Hours</th>
                      <th className="text-right p-3 text-amber-800 w-2/5">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {daysOfWeek.map((day) => {
                      const hasHours = isDaySet(day);
                      const hours = getHoursForDay(day);
                      const isEditing = editingDay === day;

                      return (
                        <tr key={day} className="border-t border-amber-200">
                          <td className="p-2 pl-3 font-medium text-amber-900">
                            {day}
                          </td>
                          <td className="p-2">
                            {isEditing ? (
                              <input
                                type="text"
                                className="w-full p-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-400 outline-none"
                                value={newHours}
                                onChange={(e) => setNewHours(e.target.value)}
                                placeholder="e.g. 10:00 AM - 10:00 PM"
                              />
                            ) : (
                              <span
                                className={
                                  hasHours
                                    ? "text-amber-900"
                                    : "text-amber-600 italic"
                                }
                              >
                                {hours}
                              </span>
                            )}
                          </td>
                          <td className="p-2 pr-3 text-right">
                            {isEditing ? (
                              <div className="flex justify-end gap-1">
                                <button
                                  className="px-2 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center text-xs"
                                  onClick={() => handleSaveHours(day)}
                                  disabled={isUpdating}
                                >
                                  {isUpdating ? (
                                    <span className="flex items-center">
                                      <div className="animate-spin h-3 w-3 border-2 border-t-transparent border-white rounded-full mr-1"></div>
                                      Save
                                    </span>
                                  ) : (
                                    <span className="flex items-center">
                                      <Check size={12} className="mr-1" /> Save
                                    </span>
                                  )}
                                </button>
                                <button
                                  className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-150 text-xs"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-end gap-1">
                                {hasHours && (
                                  <>
                                    <button
                                      className="px-2 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center text-xs"
                                      onClick={() =>
                                        handleEditHours(day, hours)
                                      }
                                    >
                                      <Edit size={12} className="mr-1" /> Edit
                                    </button>
                                    <button
                                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 flex items-center text-xs"
                                      onClick={() => handleDeleteHours(day)}
                                      disabled={isUpdating}
                                    >
                                      {isUpdating ? (
                                        <span className="flex items-center">
                                          <div className="animate-spin h-3 w-3 border-2 border-t-transparent border-white rounded-full mr-1"></div>
                                          Del
                                        </span>
                                      ) : (
                                        <span className="flex items-center">
                                          <Trash size={12} className="mr-1" />{" "}
                                          Del
                                        </span>
                                      )}
                                    </button>
                                  </>
                                )}
                                {!hasHours && (
                                  <button
                                    className="px-2 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition duration-150 flex items-center text-xs"
                                    onClick={() => {
                                      setEditingDay(day);
                                      setNewHours("10:00 AM - 10:00 PM");
                                    }}
                                  >
                                    <Plus size={12} className="mr-1" /> Add
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
        </>
      )}
    </div>
  );
};

export default RestaurantStatusPanel;
