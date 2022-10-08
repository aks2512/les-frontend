import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../api';

export default function useAuth() {
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
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
    try{
      const response = await api.patch(`users/auth`);
      localStorage.setItem('access_token', response.data.access_token);
      api.defaults.headers.common = {'Authorization': `Bearer ${response.data.access_token}`}
      setUser(response.data.user);
    }catch(err){
      handleLogout();
      toast.error('Erro ao carregar dados do usuário');
    }
  }
  
  async function cartLoadData() {
    try{
      if(authenticated){
        const response = await api.get(`carts`, {
          isOpen: true
        });
        setCart(response.data[0]);
      } 
    }catch(err){
      toast.error('Erro ao carregar dados do carrinho');
    }
  }

  async function handleLogin(email, password) {

    try {
      const auth = await api.post('users/auth',(
        {
          "email": email,
          "password": password
        }
      ));
      if (auth.data) {
        localStorage.setItem('access_token', auth.data.access_token);
        api.defaults.headers.common = {'Authorization': `Bearer ${auth.data.access_token}`}
        userLoadData();
        setAuthenticated(true);
        setUser(auth.data.user);
        return { status: auth.status, user: auth.data.user};
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
  
  return { user, setUser, userLoadData, cart, setCart, cartLoadData,  authenticated, setAuthenticated, loading, handleLogin, handleLogout };
}