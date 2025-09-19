import React, { useState } from 'react';
import Navigation from './components/Navigation.jsx';
import UserPage from './pages/UserPage.jsx';
import ElectionPage from './pages/ElectionPage.jsx';
import VotePage from './pages/VotePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import BlockchainStatusPage from './pages/BlockchainStatusPage.jsx';
import SignInPage from './pages/SignInPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('SignIn'); // Default to SignIn page

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
        return <SignInPage />;
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