import React from 'react'
import AuthProvider from './AuthProvider'
import NotificationProvider from './NotificationProvider';
import ThemeProvider from './ThemeProvider';
import SearchProvider from './SearchProvider';

function ContextProvider({children}) {
  return (
    <NotificationProvider> 
      <SearchProvider>
      <AuthProvider>
      <ThemeProvider>
      {children}
      </ThemeProvider>
      </AuthProvider>
      </SearchProvider>
        </NotificationProvider>
  );
}

export default ContextProvider
