import React, { useState, useEffect } from 'react';
import VoteForm from '../components/VoteForm.jsx';
import { castVote } from '../api/voteApi.js';
import { getAllUsers } from '../api/userApi.js';
import { getAllElections, getCandidates } from '../api/electionApi.js';

const VotePage = () => {
  const [users, setUsers] = useState([]);
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState({
    vote: false,
    data: false,
  });

  // Load initial data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(prev => ({ ...prev, data: true }));
    try {
      const [userData, electionData] = await Promise.all([
        getAllUsers(),
        getAllElections(),
      ]);
      setUsers(userData || []);
      setElections(electionData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data. Please check your backend connection.');
    } finally {
      setLoading(prev => ({ ...prev, data: false }));
    }
  };

  const handleElectionChange = async (electionId) => {
    try {
      const candidateData = await getCandidates(electionId);
      setCandidates(candidateData || []);
    } catch (error) {
      console.error('Error loading candidates:', error);
      alert('Failed to load candidates for selected election.');
    }
  };

  const handleCastVote = async (voteData) => {
    setLoading(prev => ({ ...prev, vote: true }));
    try {
      await castVote(voteData);
      alert('Vote cast successfully! Your vote has been recorded on the blockchain.');
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Failed to cast vote. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, vote: false }));
    }
  };

  if (loading.data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-pulse">Loading voting data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cast Your Vote</h1>
      
      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Important Information:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Each vote is recorded on the blockchain for transparency and security</li>
            <li>• Make sure to select the correct election and candidate before submitting</li>
            <li>• Once cast, votes cannot be changed or deleted</li>
          </ul>
        </div>
      </div>

      <VoteForm
        onSubmit={handleCastVote}
        loading={loading.vote}
        users={users}
        elections={elections}
        candidates={candidates}
        onElectionChange={handleElectionChange}
      />
    </div>
  );
};

export default VotePage;