import React from 'react';
import { BarChart3, Trophy } from 'lucide-react';

const ResultsTable = ({ results, loading, selectedElection }) => {
  if (!selectedElection) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-600">Select an election to view results.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">Loading results...</div>
      </div>
    );
  }

  if (!results || Object.keys(results).length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Results for "{selectedElection.name}"
        </h3>
        <p className="text-gray-500">No votes cast yet.</p>
      </div>
    );
  }

  // Convert results object to array and sort by votes
  const resultsArray = Object.entries(results)
    .map(([candidateName, voteCount]) => ({
      name: candidateName,
      votes: voteCount,
    }))
    .sort((a, b) => b.votes - a.votes);

  const totalVotes = resultsArray.reduce((sum, candidate) => sum + candidate.votes, 0);
  const winner = resultsArray[0];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2" />
        Results for "{selectedElection.name}"
      </h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600">Total Votes: {totalVotes}</p>
        {winner && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 font-medium">
                Leading: {winner.name} with {winner.votes} votes 
                ({totalVotes > 0 ? Math.round((winner.votes / totalVotes) * 100) : 0}%)
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Candidate</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Votes</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Percentage</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resultsArray.map((candidate, index) => {
              const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
              return (
                <tr key={candidate.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {candidate.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {candidate.votes}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {percentage.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;