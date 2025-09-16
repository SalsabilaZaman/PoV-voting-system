import { apiRequest } from './config.js';

// Cast a vote
export const castVote = async (voteData) => {
  return apiRequest('/votes', {
    method: 'POST',
    body: JSON.stringify(voteData),
  });
};

// Get election results
export const getElectionResults = async (electionId) => {
  return apiRequest(`/results/${electionId}`);
};