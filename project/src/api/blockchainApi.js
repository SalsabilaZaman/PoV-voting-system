import { apiRequest } from './config.js';

// Check if blockchain is valid
export const checkBlockchainValidity = async () => {
  return apiRequest('/blockchain/is-valid');
};