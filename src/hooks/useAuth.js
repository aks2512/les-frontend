import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../api';

export default function useAuth() {
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userExist = localStorage.getItem(`access_token`);
    if (userExist) {
      api.defaults.headers.common = {'Authorization': `Bearer ${userExist}`}
      userLoadData();
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      toast('Sua sessão expirou, faça login novamente');
      setLoading(false);
    }
  }, []);

  async function userLoadData() {
    try{
      const response = await api.patch(`users/auth`);
      if(response.data.user?.person?.carts) {
        const cartExists = response.data.user?.person.carts.find(cart => cart.isOpen);
        if(cartExists) {
          setCart(cartExists);
        }
      }

      setUser(response.data.user);
      localStorage.setItem(`access_token`, response.data.access_token);

      if(response?.data?.user?.person){
        cartLoadData()
      } else {
        setLoading(false);
      }
    }catch(err){
      console.log(err);
      toast.error('Erro ao carregar dados do usuário');
      handleLogout();
    }
  }
  
  async function cartLoadData() {
    try{
      if(user){
        const response = await api.get(`carts/?isOpen=true`); 

        if(cart){
          setCart(response.data[0]);
        } else {
          const newCart = await api.post(`carts`);
          setCart(newCart);
        }
      } 
      setLoading(false);
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
        localStorage.setItem(`access_token`, auth.data.access_token);
        api.defaults.headers.common = {'Authorization': `Bearer ${auth.data.access_token}`}
        userLoadData();
        setAuthenticated(true);
        setUser(auth.data.user);
        return { status: auth.status, user: auth.data.user};
      }
      
    } catch (e) {
      return toast(e?.response?.data?.message || 'Erro ao fazer login');
    } 
  }

  async function handleLogout() {
    localStorage.removeItem(`access_token`);

    setUser({});
    setCart({});

    api.defaults.headers.common.Authorization = '';

    setAuthenticated(false);
  }
  
  return { user, setUser, userLoadData, cart, setCart, cartLoadData,  authenticated, setAuthenticated, loading, handleLogin, handleLogout };
}