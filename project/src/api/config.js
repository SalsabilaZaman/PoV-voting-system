// API Configuration
// Update this BASE_URL to match your Spring Boot backend
export const BASE_URL = '/api';

// Common fetch wrapper with error handling
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response has content before parsing JSON
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};