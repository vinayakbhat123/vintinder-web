import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const [error, setError] = useState(null);

  const getFeed = async () => {
    if(feedData && feedData.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res?.data || res));
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (error) {
    return (
      <div className="w-full flex justify-center py-6 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!feedData || feedData.length === 0) {
    return (
      <div className="w-full flex justify-center py-6 text-white bg-base-200">
        No users in the pipeline.
      </div>
    );
  }

  return (
    <div className="flex justify-center py-3">
      <UserCard user={feedData[0]} />
    </div>
  );
};

export default Feed;
