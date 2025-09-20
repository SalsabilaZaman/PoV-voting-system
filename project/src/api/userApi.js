import { apiRequest } from './config.js';

// Create a new user
export const createUser = async (userData) => {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const signup = async (userData) => {
  return apiRequest('/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};
// User signin
export const signin = async (email, password) => {
  return apiRequest('/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

// Get all users
export const getAllUsers = async () => {
  return apiRequest('/users');
};