import axios from "axios";
import config from "../../config"; // Adjust the path if needed

/**
 * Sends a POST request to add a new menu item.
 * @param {Object} menuItem - The menu item data to be saved.
 * @returns {Promise<Object>} - The saved menu item data returned by the backend.
 */

export async function addMenuItem(menuItem) {
  console.log("Calling addMenuItem API");
  try {
    const response = await axios.post(`${config.MENU}`, menuItem);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateMenuItem(menuItemId, updatedData) {
  console.log("Calling updateMenuItem API");
  try {
    const response = await axios.patch(
      `${config.MENU}/${menuItemId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMenuItem(menuItemId) {
  console.log("Calling getMenuItem API");
  try {
    const response = await axios.get(`${config.MENU}/item/${menuItemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateAvailability(menuItemId, available) {
  console.log('Calling updateAvailability API');
  try {
    const response = await axios.patch(
      `${config.MENU}/availability/${menuItemId}`,
      { available }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating availability:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function updatePrepTime(menuItemId, prepTime) {
  try {
    const response = await axios.patch(
      `${config.MENU}/prepTime/${menuItemId}`,
      { prepTime }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating prep time:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getRestaurantMenu(id) {
  console.log("Calling getRestaurantMenu API");
  try {
    const response = await axios.get(`${config.MENU}/${id}`);
    // console.log(`${config.MENUQ}/${id}`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteMenuItem(menuItemId) {
  console.log("Calling deleteMenuItem API");
  try {
    const response = await axios.delete(`${config.MENU}/${menuItemId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting menu item:",
      error.response?.data || error.message
    );
    throw error;
  }
}