import React, { createContext, ReactNode } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function AuthProvider({children}) {
  const {
    setUser, user, authenticated, loading, handleLogin, handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{ loading, setUser, user, authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };