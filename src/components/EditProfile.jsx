import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from "axios";
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  const [firstName,setfirstName] = useState(user.firstName);
  const [lastName,setlastName] = useState(user.lastName);
  const [age,setage] = useState(user.age || "");
  const [gender,setgender] = useState(user.gender || "")
  const [about,setabout] = useState(user.about || "")
  const [skills,setskills] = useState(user.skills || "")
  const [photoUrl,setphotoUrl] = useState(user.photoUrl || "")
  const [error,seterror] = useState("")
  const [showToast,setshowToast] = useState(false)
  const dispatch = useDispatch()

  const saveProfile = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.patch(BASE_URL + "/profile/update",{firstName,lastName,age,gender,about,photoUrl,skills},{withCredentials:true})
      dispatch(addUser(res?.data?.data))
      console.log(res?.config)
      setshowToast(true)
      setTimeout(() => {
        setshowToast(false)
      }, 3000);
     }catch (error) {
      if(error?.response){
        seterror(error.response?.data);
        console.error("Backend error",error.response?.data)
      }else{
        console.error("Network Error");
        seterror("NetWork Error")
      }
      
    }
  }
    
 return (
  <>
    <div className="min-h-screen bg-gray-500 flex items-center justify-center ">
      <div className="bg-gray-700 shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Edit Profile</h1>
        <form onSubmit={saveProfile} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              required
              onChange={(e) => setfirstName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">lastName</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              required
              onChange={(e) => setlastName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
           <div>
            <label className="block text-sm mb-1">Age</label>
            <input
              type="text"
              name="age"
              value={age}
              required
              onChange={(e) => setage(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
           <div>
             <label className="block text-sm mb-1">Gender</label>
               <select
                  name="gender"
                  value={gender}
                  required
                  onChange={(e) => setgender(e.target.value)}
                  className="w-full bg-gray-700 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                 <option value="male">Male</option>
                 <option value="female">Female</option>
                 <option value="others">Others</option>
               </select>
             </div>

           <div>
            <label className="block text-sm mb-1">PhotoUrl</label>
            <input
              type="text"
              name="photoUrl"
              value={photoUrl}
              required
              onChange={(e) => setphotoUrl(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
           <div>
            <label className="block text-sm mb-1">About</label>
            <input
              type="text"
              name="about"
              value={about}
              required
              onChange={(e) => setabout(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
           <div>
            <label className="block text-sm mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={skills}
              required
              onChange={(e) => setskills(e.target.value.split(","))}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <p className='text-red-500'>{error}</p>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
       <div className='px-16  flex'>
        <UserCard user={{firstName,lastName,about,age,gender,photoUrl,skills}} />
      </div>
    </div>
   {showToast && <div className="toast toast-top toast-center">
       <div className="alert alert-success">
          <span>Profile saved successfully.</span>
       </div>
    </div>}
  </>
  );
}

export default EditProfile