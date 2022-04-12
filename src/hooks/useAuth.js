import { useState, useEffect } from 'react';

import api from '../api';

export default function useAuth() {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let userExist = localStorage.getItem('access_token');

    if (userExist) {

      api.defaults.headers.authorization = userExist;
      userLoadData();
      setAuthenticated(true);

    } else {

      setAuthenticated(false);
      api.defaults.headers.authorization = undefined;

    }

    setLoading(false);

  }, []);

  async function userLoadData() {
    const userData = await api.get('users');
    setUser(userData.data);
  }
  
  async function handleLogin(email, password) {

    const auth = await api.post('users/auth',(
      {
        "email": email,
        "password": password
      }
    ));

    console.log(auth.data)

    if (auth.data) {
      localStorage.setItem('access_token', auth.data.access_token);
      localStorage.setItem('refresh_token', auth.data.refresh_token);
      api.defaults.headers.authorization = auth.data.token;
      setAuthenticated(true);
      return true;
    }
    return false;
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    api.defaults.headers.authorization = undefined;
  }
  
  return { user, setUser, userLoadData, authenticated, setAuthenticated, loading, handleLogin, handleLogout };
}