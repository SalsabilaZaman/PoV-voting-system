import React from 'react';
import { Users } from 'lucide-react';

const CandidateList = ({ candidates, loading, selectedElection }) => {
  if (!selectedElection) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-600">Select an election to view candidates.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">Loading candidates...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2" />
        Candidates for "{selectedElection.name}" ({candidates.length})
      </h3>
      
      {candidates.length === 0 ? (
        <p className="text-gray-500">No candidates added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
              <h4 className="text-lg font-medium text-gray-900">{candidate.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{candidate.affiliation}</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                ID: {candidate.id}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateList;