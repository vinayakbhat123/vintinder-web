import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  const getFeed = async () => {
    if(feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true})
      dispatch(addFeed(res?.data || res))
      // console.log(res?.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getFeed();
  },[])
  return (
   feedData && <div className=' flex justify-center py-3'>
      <UserCard user={feedData[0]} />
    </div> 
  )
}

export default Feed