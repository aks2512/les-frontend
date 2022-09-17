import { useState, useEffect } from 'react';

import api from '../api';

export default function useAuth() {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let userExist = localStorage.getItem('access_token');

    if (userExist) {

      api.defaults.headers.common = {'Authorization': `Bearer ${userExist}`}
      userLoadData();
      setAuthenticated(true);

    } else {

      setAuthenticated(false);

    }

    setLoading(false);

  }, []);

  async function userLoadData() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const user = await api.get(`users/${localUser.id}`);
    localStorage.setItem('user', JSON.stringify(user.data));
    setUser(user.data);
  }
  
  async function handleLogin(email, password) {

    try {
      const auth = await api.post('users/auth',(
        {
          "email": email,
          "password": password
        }
      ));
  
      console.log(auth)
      if (auth.data) {
        localStorage.setItem('user', JSON.stringify(auth.data.userWithoutPassword));
        localStorage.setItem('access_token', auth.data.access_token);
        localStorage.setItem('refresh_token', '');
        console.log(auth.data.access_token)
        api.defaults.headers.common = {'Authorization': `Bearer ${auth.data.access_token}`}
        userLoadData();
        setAuthenticated(true);
        setUser(auth.data.user);
        return 'Login efetuado com sucesso!';
      }

    } catch (e) {
      return e?.response?.data?.message || 'Error :(';
    } 
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  
  return { user, setUser, userLoadData, authenticated, setAuthenticated, loading, handleLogin, handleLogout };
}