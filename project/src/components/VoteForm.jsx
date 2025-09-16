import React, { useState, useEffect } from 'react';
import { Vote } from 'lucide-react';

const VoteForm = ({ 
  onSubmit, 
  loading, 
  users, 
  elections, 
  candidates, 
  onElectionChange 
}) => {
  const [formData, setFormData] = useState({
    userId: '',
    electionId: '',
    candidateId: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      userId: parseInt(formData.userId),
      electionId: parseInt(formData.electionId),
      candidateId: parseInt(formData.candidateId),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // When election changes, fetch candidates for that election
    if (name === 'electionId' && value) {
      onElectionChange(parseInt(value));
      setFormData(prev => ({ ...prev, candidateId: '' })); // Reset candidate selection
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Vote className="h-5 w-5 mr-2" />
        Cast Your Vote
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Voter
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.role})
              </option>
            ))}
          </select>
        </div>

        {/* Election Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Election
          </label>
          <select
            name="electionId"
            value={formData.electionId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose an election...</option>
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name}
              </option>
            ))}
          </select>
        </div>

        {/* Candidate Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Candidate
          </label>
          <select
            name="candidateId"
            value={formData.candidateId}
            onChange={handleChange}
            required
            disabled={!formData.electionId}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              {formData.electionId ? 'Choose a candidate...' : 'Select an election first'}
            </option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} ({candidate.affiliation})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.userId || !formData.electionId || !formData.candidateId}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? 'Casting Vote...' : 'Cast Vote'}
        </button>
      </form>
    </div>
  );
};

export default VoteForm;