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

//   i have added this to your existing api/menuItem.js file

/**
 * Fetches a single menu item by its ID
 * @param {string} id - The ID of the menu item
 * @returns {Promise<Object>} - The menu item data
 */
export const getMenuItem = async (id) => {
  try {
    const response = await fetch(`/api/menu-items/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Include cookies for authentication
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch menu item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu item:', error);
    throw error;
  }
};

/**
 * Updates an existing menu item
 * @param {FormData} formData - FormData object containing all the menu item data
 * @returns {Promise<Object>} - The updated menu item data
 */
export const updateMenuItem = async (formData) => {
  try {
    const response = await fetch('/api/menu-items/update', {
      method: 'PUT',
      body: formData, // FormData will set the correct Content-Type with boundary
      credentials: 'include' // Include cookies for authentication
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update menu item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

/**
 * Toggles a menu item's availability
 * @param {string} id - The ID of the menu item
 * @param {boolean} available - The new availability state
 * @returns {Promise<Object>} - The updated menu item data
 */
export const toggleMenuItemAvailability = async (id, available) => {
  try {
    const response = await fetch(`/api/menu-items/${id}/toggle-availability`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ available }),
      credentials: 'include' // Include cookies for authentication
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update availability');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error toggling availability:', error);
    throw error;
  }
};

/**
 * Deletes a menu item
 * @param {string} id - The ID of the menu item to delete
 * @returns {Promise<Object>} - The response data
 */
export const deleteMenuItem = async (id) => {
  try {
    const response = await fetch(`/api/menu-items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Include cookies for authentication
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete menu item');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};