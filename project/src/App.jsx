import React, { useState } from 'react';
import Navigation from './components/Navigation.jsx';
import UserPage from './pages/UserPage.jsx';
import ElectionPage from './pages/ElectionPage.jsx';
import VotePage from './pages/VotePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import BlockchainStatusPage from './pages/BlockchainStatusPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('users');

  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <UserPage />;
      case 'elections':
        return <ElectionPage />;
      case 'vote':
        return <VotePage />;
      case 'results':
        return <ResultsPage />;
      case 'blockchain':
        return <BlockchainStatusPage />;
      default:
        return <UserPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;