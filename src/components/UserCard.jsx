import React from 'react'

const UserCard = ({user}) => {
  const {firstName,lastName,age,gender,skills,about,photoUrl} = user
  return (
    <div className="w-96 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="h-52 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={photoUrl}
          alt="Shoes"
        />
      </div>
   
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-gray-800">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-gray-600">{age + " " + gender}</p> } 
        <p className="text-gray-600">{about}</p>
      {skills && <p>{skills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm shadow-sm"
        >
          {skill}
        </span>
      ))}</p> }
   

        <div className="flex justify-evenly">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            Ignored
          </button>
           <button className="px-4 py-2 bg-pink-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard


