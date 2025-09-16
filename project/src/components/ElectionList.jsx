import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const ElectionList = ({ elections, loading, onSelectElection }) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">Loading elections...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Elections ({elections.length})
      </h3>
      
      {elections.length === 0 ? (
        <p className="text-gray-500">No elections created yet.</p>
      ) : (
        <div className="space-y-4">
          {elections.map((election) => (
            <div 
              key={election.id} 
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => onSelectElection && onSelectElection(election)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{election.name}</h4>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    Start: {new Date(election.startTime).toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    End: {new Date(election.endTime).toLocaleString()}
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ID: {election.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectionList;