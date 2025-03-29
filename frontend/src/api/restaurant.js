import axios from "axios";
import config from "../../config";

// export async function registerRestaurant(data){
// //   currentUserUid,
// //   email,
// //   phone,
// //   ResName,
// //   ResAdrs,
// //   ResLoc,
// //   NoSeats,
// //   ResCategory,
// //   CuisineType,
// //   OperatingHours,
// //   SocialMedia
// // ) {
//   console.log("inside register func");
  
//   const data = {
//     firebaseUid: currentUserUid,
//     email: email,
//     phone: phone,
//     restaurantName: ResName,
//     restaurantAddress: ResAdrs,
//     resLocation: ResLoc,
//     noOfSeats: NoSeats,
//     restaurantCategory: ResCategory,
//     cuisineType: CuisineType,
//     operatingHours: OperatingHours,
//     socialMedia: SocialMedia,
//   };

//   try {
//     const response = await axios.post(config.MENUQ, data);
//     return response.data;
// } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }


/**
 * Fetch user data by Firebase UID.
 * @param {string} firebaseUID - The Firebase user ID.
 * @returns {Promise<Object>} - The user data from the backend.
 */

export async function fetchRestaurantByUID(firebaseUID) {
  try {
    const response = await axios.get(`${config.MENUQ}/${firebaseUID}`);
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
  
