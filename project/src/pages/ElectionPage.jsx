import React, { useState, useEffect } from 'react';
import ElectionForm from '../components/ElectionForm.jsx';
import ElectionList from '../components/ElectionList.jsx';
import CandidateForm from '../components/CandidateForm.jsx';
import CandidateList from '../components/CandidateList.jsx';
import { createElection, getAllElections, addCandidate, getCandidates } from '../api/electionApi.js';

const ElectionPage = () => {
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [loading, setLoading] = useState({
    elections: false,
    candidates: false,
    createElection: false,
    addCandidate: false,
  });

  // Load elections on component mount
  useEffect(() => {
    loadElections();
  }, []);

  // Load candidates when election is selected
  useEffect(() => {
    if (selectedElection) {
      loadCandidates(selectedElection.id);
    }
  }, [selectedElection]);

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

  const loadCandidates = async (electionId) => {
    setLoading(prev => ({ ...prev, candidates: true }));
    try {
      const candidateData = await getCandidates(electionId);
      setCandidates(candidateData || []);
    } catch (error) {
      console.error('Error loading candidates:', error);
      alert('Failed to load candidates.');
    } finally {
      setLoading(prev => ({ ...prev, candidates: false }));
    }
  };

  const handleCreateElection = async (electionData) => {
    setLoading(prev => ({ ...prev, createElection: true }));
    try {
      await createElection(electionData);
      alert('Election created successfully!');
      loadElections(); // Refresh the election list
    } catch (error) {
      console.error('Error creating election:', error);
      alert('Failed to create election. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, createElection: false }));
    }
  };

  const handleAddCandidate = async (candidateData) => {
    if (!selectedElection) return;
    
    setLoading(prev => ({ ...prev, addCandidate: true }));
    try {
      await addCandidate(selectedElection.id, candidateData);
      alert('Candidate added successfully!');
      loadCandidates(selectedElection.id); // Refresh the candidate list
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, addCandidate: false }));
    }
  };

  const handleSelectElection = (election) => {
    setSelectedElection(election);
    setCandidates([]); // Clear previous candidates
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Election Management</h1>
      
      {/* Election Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <ElectionForm 
            onSubmit={handleCreateElection} 
            loading={loading.createElection} 
          />
        </div>
        <div>
          <ElectionList 
            elections={elections} 
            loading={loading.elections}
            onSelectElection={handleSelectElection}
          />
        </div>
      </div>

      {/* Candidate Section */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Candidate Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CandidateForm 
              onSubmit={handleAddCandidate}
              loading={loading.addCandidate}
              selectedElection={selectedElection}
            />
          </div>
          <div>
            <CandidateList 
              candidates={candidates}
              loading={loading.candidates}
              selectedElection={selectedElection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionPage;