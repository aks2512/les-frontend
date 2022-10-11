import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../api';

export default function useAuth() {
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType , setUserType] = useState();

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
      if(authenticated){
        const response = await api.patch(`users/auth`);

        setUser(response.data.user);
        setUserType(user.person ? '@person' : '@master');
  
        localStorage.setItem(`${userType} access_token`, response.data.access_token);
        api.defaults.headers.common = {'Authorization': `Bearer ${response.data.access_token}`}
      }
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
        localStorage.setItem(`${userType} access_token`, auth.data.access_token);
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
    localStorage.removeItem(`${userType} access_token`);
    localStorage.removeItem(`${userType} refresh_token`);
  }
  
  return { user, setUser, userLoadData, cart, setCart, cartLoadData,  authenticated, setAuthenticated, loading, handleLogin, handleLogout };
}