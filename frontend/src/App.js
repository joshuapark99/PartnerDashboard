import React from 'react';
import LandingPage from './components/LandingPage';
import { UserProvider } from './utils/userContext';

const App = () => {
  return (
    <UserProvider>
      <LandingPage />
    </UserProvider>
  );
};

export default App;