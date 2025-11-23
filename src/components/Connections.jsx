import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addConnection } from '../utils/connectionSlice'
import { useDispatch, useSelector } from 'react-redux'

const Connections = () => {
  const connections = useSelector((store) =>store.connection)
  const dispatch = useDispatch();
  const fetchConnections = async () => {
     try {
      const res = await axios.get(BASE_URL + "/user/connections",{withCredentials:true})
      console.log(res?.data?.data)
      dispatch(addConnection(res?.data?.data))
    }catch (error) {
       if(error?.message || error?.response){
        console.error(error?.message || error?.response?.data)
       }
      
  }
  }
  useEffect(() => {
    if(!connections){
      fetchConnections();
    }
  },[])
  if(!connections) return;
  if(connections.length === 0) return <h1>No Connection Found</h1>

  return (
    <div className='text-center my-10'>
      <div className='text-bold text-white text-3xl'>
        <h1>Connections</h1>
        <div className=''>
         { connections.map((connection) =>{
          const {firstName,lastName,photoUrl,about,age,gender,skills} = connection
          return(
            <div key={connection._id}
            className='flex m-4 p-4 rounded-2xl  bg-base-200 w-1/2  mx-auto' >
               <div className=''>
                <img alt='photo' className='rounded-full' src={photoUrl} width={100} />  
               </div>
               <div className='text-left mx-4'>
                <h1>{firstName +" " +lastName}</h1>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                {skills && <p>{skills.map((skill, index) => (
                   <span key={index}className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm shadow-sm">
                     {skill} </span> ))}</p> }
               </div>
             </div>
               
           
          )
         }) }
          </div>  
      </div>
    </div>
  )
}

export default Connections