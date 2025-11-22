import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/RequestSlice'


const Requests = () => {
  const dispatch = useDispatch();
  const RequestData = useSelector((store) => store.Request)
  console.log(RequestData)
  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received",{withCredentials:true})
      console.log("Data",res?.data)
      dispatch(addRequest(res?.data))
    } catch (error) {
      if(error.status === 400 || error.status === 404) {
        console.error("Data not Found")
      }
      console.error("ERROR Occured:",error.message)
    }
  }
  useEffect(() => {
     getRequest()
  },[])
  if(!RequestData){
    return console.log("No Request found")
  }
  console.log(RequestData);
  return (
    <div className='text-center bg-base-200  '>
      <div className='  '>
        <h1 className='font-bold'>Requests</h1>
        <div className='w-1/6 '>
         {RequestData.map((request) => {
  const { firstName, lastName, photoUrl, skills } = request.fromUserId;

  return (
    <div
      key={request._id}
      className="flex items-center gap-4 p-4  rounded-xl shadow-md bg-base-300 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <img
        src={photoUrl}
        className="w-16 h-16 rounded-full object-cover border border-gray-300 shadow-sm"
      />

      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-white tracking-tight">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-white">
          {skills?.slice(0, 3).join(", ")}
          {skills?.length > 3 ? "..." : ""}
        </p>

        <button type='submit' className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-green-400 text-red-700 font-medium hover:bg-green-500 cursor-pointer">Accepted</button>
        <button type='submit' className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-red-400 text-white font-medium hover:bg-red-500 cursor-poi">Rejected</button>
      </div>
    </div>
  );
})}

        </div>
      </div>
    </div> 
  );
  }

export default Requests