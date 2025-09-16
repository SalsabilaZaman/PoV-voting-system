import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

const CandidateForm = ({ onSubmit, loading, selectedElection }) => {
  const [formData, setFormData] = useState({
    name: '',
    affiliation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', affiliation: '' }); // Reset form
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!selectedElection) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-600">Select an election first to add candidates.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <UserPlus className="h-5 w-5 mr-2" />
        Add Candidate to "{selectedElection.name}"
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Candidate Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter candidate name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Affiliation (Party/Organization)
          </label>
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter party or organization"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? 'Adding...' : 'Add Candidate'}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;