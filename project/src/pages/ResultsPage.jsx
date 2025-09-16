import React, { useState, useEffect } from 'react';
import ResultsTable from '../components/ResultsTable.jsx';
import { getElectionResults } from '../api/voteApi.js';
import { getAllElections } from '../api/electionApi.js';
import { RefreshCw } from 'lucide-react';

const ResultsPage = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({
    elections: false,
    results: false,
  });

  // Load elections on component mount
  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    setLoading(prev => ({ ...prev, elections: true }));
    try {
      const electionData = await getAllElections();
      setElections(electionData || []);
    } catch (error) {
      console.error('Error loading elections:', error);
      alert('Failed to load elections. Please check your backend connection.');
    } finally {
      setLoading(prev => ({ ...prev, elections: false }));
    }
  };

  const loadResults = async (electionId) => {
    setLoading(prev => ({ ...prev, results: true }));
    try {
      const resultsData = await getElectionResults(electionId);
      setResults(resultsData || {});
    } catch (error) {
      console.error('Error loading results:', error);
      alert('Failed to load election results.');
      setResults({});
    } finally {
      setLoading(prev => ({ ...prev, results: false }));
    }
  };

  const handleElectionSelect = (event) => {
    const electionId = parseInt(event.target.value);
    const election = elections.find(e => e.id === electionId);
    setSelectedElection(election);
    
    if (election) {
      loadResults(election.id);
    } else {
      setResults({});
    }
  };

  const handleRefreshResults = () => {
    if (selectedElection) {
      loadResults(selectedElection.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Election Results</h1>
      
      {/* Election Selection */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Election</h3>
          {selectedElection && (
            <button
              onClick={handleRefreshResults}
              disabled={loading.results}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading.results ? 'animate-spin' : ''}`} />
              Refresh Results
            </button>
          )}
        </div>
        
        <select
          value={selectedElection?.id || ''}
          onChange={handleElectionSelect}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose an election to view results...</option>
          {elections.map((election) => (
            <option key={election.id} value={election.id}>
              {election.name} (ID: {election.id})
            </option>
          ))}
        </select>
      </div>

      {/* Results Display */}
      <ResultsTable 
        results={results}
        loading={loading.results}
        selectedElection={selectedElection}
      />
    </div>
  );
};

export default ResultsPage;