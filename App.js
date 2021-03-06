/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { AuthProvider } from './components/AuthProvider';
import Routes from './Routes'


const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
