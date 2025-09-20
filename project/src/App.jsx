import React, { useState } from 'react';
import Navigation from './components/Navigation.jsx';
import UserPage from './pages/UserPage.jsx';
import ElectionPage from './pages/ElectionPage.jsx';
import VotePage from './pages/VotePage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';
import BlockchainStatusPage from './pages/BlockchainStatusPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('SingIn'); // Default to SignIn page

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
      case 'SignUp':
        return <SignupPage onSignup={() => setCurrentPage('SignIn')} />;
      case 'SignIn':
        return <SignInPage onSignIn={() => setCurrentPage('users')} />;
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