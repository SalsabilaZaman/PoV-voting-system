import { apiRequest } from './config.js';

// Create a new user
export const createUser = async (userData) => {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Get all users
export const getAllUsers = async () => {
  return apiRequest('/users');
};