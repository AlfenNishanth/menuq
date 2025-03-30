import axios from "axios";
import config from "../../config"; // Adjust the path if needed

/**
 * Sends a POST request to add a new menu item.
 * @param {Object} menuItem - The menu item data to be saved.
 * @returns {Promise<Object>} - The saved menu item data returned by the backend.
 */

export async function addMenuItem(menuItem) {
  try {
    const response = await axios.post(`${config.MENUQ}/menu`, menuItem);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRestaurantMenu(id) {

  try {
    const response = await axios.get(`${config.MENU}/${id}`);
  console.log(`${config.MENUQ}/${id}`)
    return response.data;
  } catch (error) {
    throw error;
  }
}
