import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Sidebar from './components/Sidebar';
import ClientsTab from './components/ClientsTab';
import TalentsTab from './components/TalentsTab';
import GigsTab from './components/GigsTab';
import NotesTab from './components/NotesTab';
import DarkModeToggle from './components/DarkModeToggle';
import { getCurrentUser } from './utils/auth';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [activeTab, setActiveTab] = useState('clients');

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'clients':
        return <ClientsTab />
      case 'talents':
        return <TalentsTab />
      case 'gigs':
        return <GigsTab />
      case 'notes':
        return <NotesTab />
      default:
        return <ClientsTab />
    }
  }

  // If not logged in, show auth forms
  if (!user) {
    if (showSignup) {
      return (
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="absolute top-4 right-4">
              <DarkModeToggle />
            </div>
            <Signup onSignupSuccess={() => setShowSignup(false)} />
            <div className="text-center mt-4">
              <button 
                onClick={() => setShowSignup(false)}
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </ThemeProvider>
      );
    }
    
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="absolute top-4 right-4">
            <DarkModeToggle />
          </div>
          <Login onLogin={setUser} />
          <div className="text-center mt-4">
            <button 
              onClick={() => setShowSignup(true)}
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // If logged in, show main app
  return (
    <ThemeProvider>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Creative Ops Hub
              </h1>
              <DarkModeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto px-8 py-6 bg-gray-50 dark:bg-gray-900">
            {renderActiveTab()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App; 