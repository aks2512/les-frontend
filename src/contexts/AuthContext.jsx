import React, { createContext } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function AuthProvider({children}) {
  const {
    setUser, user, userLoadData, authenticated, loading, handleLogin, handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{ loading, setUser, user, userLoadData, authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };