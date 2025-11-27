import { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const {toUserId} = useParams();
  const [Messages,setMessages] = useState([{text:"Hello"}]);
  console.log(toUserId)
  return(
    <div className=" bg-base-300">
      <div className=" w-1/2 mx-auto bg-base-200 border border-gray-700 flex flex-col h-[70vh] ">
        <h1 className="text-3xl p-5 flex justify-center text-white font-bold border-gray-600 ">Chat</h1>
      <div className="flex-1 overflow-scroll p-5 ">
        {Messages.map((msg,index) => {
          return <div key={index}>{msg.text} </div>
        })}</div>
      <div className="flex justify-center border border-gray-700 p-5 ">
        <input className=" flex-1 border border-gray-700 shadow-2xl" type="text"/>
        <button className=" mx-2 bg-red-500 hover:bg-red-700 rounded-sm text-white p-2">send</button>
      </div>
    </div></div>
  );
}

export default Chat;

