import React, { createContext } from 'react';

import useAuth from '../hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    setUser, user, userLoadData, cart, setCart, cartLoadData, authenticated, loading, handleLogin, handleLogout
  } = useAuth();

  return (
    <Context.Provider value={{
      loading, setUser, user, userLoadData, cart, setCart, cartLoadData, authenticated, handleLogin, handleLogout
    }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };