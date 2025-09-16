import { apiRequest } from './config.js';

// Create a new election
export const createElection = async (electionData) => {
  return apiRequest('/elections', {
    method: 'POST',
    body: JSON.stringify(electionData),
  });
};

// Get all elections
export const getAllElections = async () => {
  return apiRequest('/elections');
};

// Add candidate to election
export const addCandidate = async (electionId, candidateData) => {
  return apiRequest(`/elections/${electionId}/candidates`, {
    method: 'POST',
    body: JSON.stringify(candidateData),
  });
};

// Get candidates for election
export const getCandidates = async (electionId) => {
  return apiRequest(`/elections/${electionId}/candidates`);
};