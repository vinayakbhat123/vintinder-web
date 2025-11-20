import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
import Footer from './Footer'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)
  const fetchUser = async () => {
    try {
      if(userData) return;
      const res = await axios.get(BASE_URL +"/profile/view",{withCredentials:true})
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.status === 401){
        navigate("/login")
      }
      console.error(error);
    }
  } 
  useEffect(() => {
    fetchUser();
  },[])


  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body