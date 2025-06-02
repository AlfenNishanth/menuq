import axios from "axios";
import config from "../../config";


/**
 * Fetch user data by Firebase UID.
 * @param {string} firebaseUID - The Firebase user ID.
 * @returns {Promise<Object>} - The user data from the backend.
 */

export async function fetchRestaurantByUID(firebaseUID) {
  console.log("calling fetRestaurantByUID API");
  try {
    const response = await axios.get(`${config.MENUQ}/${firebaseUID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRestaurantByID(ResId) {
  console.log("calling fetRestaurantByID API");
  try {
    const response = await axios.get(`${config.MENUQ}/byId/${ResId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registerRestaurant(data) {
    try {
        console.log('trying to register')
      const response = await axios.post(config.MENUQ, data);
      return response.data;
    } catch (error) {
      console.error("Error registering restaurant:", error);
      throw error;
    }
  }

  export async function updateRestaurant(id, data) {
    try {
      console.log("Trying to update restaurant");
      console.log(id, data);
      const response = await axios.patch(`${config.MENUQ}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating restaurant:", error);
      throw error;
    }
  }
  

  // Add these functions to restaurant.js

/**
 * Update restaurant open/closed status
 * @param {string} firebaseUID - The Firebase user ID
 * @param {boolean} isOpen - The new open status (true=open, false=closed)
 * @returns {Promise<Object>} - The updated restaurant data
 */
export async function updateRestaurantStatus(firebaseUID, isOpen) {
  try {
    console.log(`Updating restaurant status to: ${isOpen ? 'Open' : 'Closed'}`);
    const response = await axios.patch(
      `${config.MENUQ}/${firebaseUID}/status`, 
      { resOpen: isOpen }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating restaurant status:", error);
    throw error;
  }
}

/**
 * Update all operating hours for a restaurant
 * @param {string} firebaseUID - The Firebase user ID
 * @param {Array} operatingHours - Array of day and hours objects
 * @returns {Promise<Object>} - The updated restaurant data
 */
export async function updateAllOperatingHours(firebaseUID, operatingHours) {
  try {
    console.log("Updating all restaurant operating hours");
    const response = await axios.put(
      `${config.MENUQ}/${firebaseUID}/hours`,
      { operatingHours }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating all operating hours:", error);
    throw error;
  }
}

/**
 * Update or add operating hours for a specific day
 * @param {string} firebaseUID - The Firebase user ID
 * @param {string} day - Day of the week
 * @param {string} hours - Operating hours string (e.g. "9AM - 9PM")
 * @returns {Promise<Object>} - The updated restaurant data
 */
export async function updateDayOperatingHours(firebaseUID, day, hours) {
  try {
    console.log(`Updating operating hours for ${day}`);
    const response = await axios.patch(
      `${config.MENUQ}/${firebaseUID}/hours`,
      { day, hours }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating operating hours for ${day}:`, error);
    throw error;
  }
}

/**
 * Delete operating hours for a specific day
 * @param {string} firebaseUID - The Firebase user ID
 * @param {string} day - Day of the week to remove hours for
 * @returns {Promise<Object>} - The updated restaurant data
 */
export async function deleteDayOperatingHours(firebaseUID, day) {
  try {
    console.log(`Deleting operating hours for ${day}`);
    const response = await axios.delete(
      `${config.MENUQ}/${firebaseUID}/hours/${day}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting operating hours for ${day}:`, error);
    throw error;
  }
}



export async function validateQrSignup(qrId, password) {
  try {
    const res = await axios.post(`${config.MENUQ}/validate-signup`, {
      qrId,
      password,
    });
    console.log("validating signup password");
    console.log(res)
    return res.data; // { success: true } or { success: false, message: '...' }
  } catch (err) {
    // Optional: handle specific error cases here too
    console.error("QR validation API error:", err);
    return { success: false, message: "Server error" };
  }
}