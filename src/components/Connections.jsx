import axios from 'axios'
import { Link } from 'react-router-dom'
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
      // console.log(res?.data?.data)
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
  <div className="flex flex-col items-center py-10">
    <h1 className="text-4xl font-semibold text-white mb-8 tracking-wide">
      Connections
    </h1>

    <div className="flex flex-col gap-6 w-full max-w-4xl">
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
          connection;

        return (
          <div
            key={connection._id}
            className="flex items-center justify-between bg-gray-800 px-6 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
          >
            {/* Left Section */}
            <div className="flex gap-5 items-center">
              {/* Avatar */}
              <img
                alt="photo"
                src={photoUrl || ""}
                width={90}
                height={90}
                className="rounded-full object-cover border-2 border-gray-600 shadow-md"
              />

              {/* Details */}
              <div className="text-gray-200 space-y-1">
                <h2 className="text-xl font-medium tracking-wide">
                  {firstName + " " + lastName}
                </h2>

                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age} • {gender}
                  </p>
                )}

                <p className="text-sm text-gray-300 max-w-md leading-relaxed">
                  {about}
                </p>

                {/* Skills */}
                {skills && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-700 text-white rounded-xl text-xs font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
          <Link to={`/chat/${_id}`}><button 
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-white text-sm font-semibold shadow-sm transition-all duration-200">
              Chat
            </button></Link>   
          </div>
        );
      })}
    </div>
  </div>
);

}

export default Connections