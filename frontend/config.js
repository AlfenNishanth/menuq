// src/config.js
const API_BASE_URL =  "http://localhost:8080/api";

// const API_BASE_URL =  "https://menuq.arknishinvent.com/api";
const QR_BASE_URL = "https://menuq.in"

export default {
  MENUQ: `${API_BASE_URL}/menuq`,
  MENU: `${API_BASE_URL}/menu`,
  QR_URL: `${QR_BASE_URL}/res`
  // Add other endpoints as needed
};