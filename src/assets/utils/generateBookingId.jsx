// src/utils/generateBookingId.js

export const generateBookingId = () => 'BK' + Math.random().toString(36).substring(2, 10).toUpperCase();
