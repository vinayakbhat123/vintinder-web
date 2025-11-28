import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import {useSelector} from "react-redux"
import { useEffect } from "react";
import {createSocketConnection} from "../utils/socket"
import { BASE_URL } from "../utils/constants";
const Chat = () => {
  const {toUserId} = useParams();
  const [Messages,setMessages] = useState([])
  const [NewMessages,setNewMessages] = useState("");
  const user = useSelector((store) => store.user)
  const userId = user?._id;
  const firstName = user?.firstName;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + toUserId,{withCredentials:true})
      console.log(chat?.data?.messages)
      const chatMessages = chat?.data?.messages.map((msg) => {
        const {senderId,text} = msg;
        return{
          firstName:senderId?.firstName,
          lastName:senderId?.lastName,
          text:text
        }
      });
      setMessages(chatMessages)
    } catch (error) {
      console.error(error)
      
    }
  }

  useEffect(() => {
    fetchChatMessages()
  },[])

  useEffect(() => {
    if(!userId){
      return 
    }
    if (!toUserId) {
     console.warn("Missing toUser");
     return;
    }
    const socket  = createSocketConnection();
    // As soon page loaded, the socket connection is made and joinchat event is emited
    socket.emit("joinchat",{firstName,userId,toUserId});
    // Receive the messages 

    socket.on("message Received",({firstName,text}) => {
      console.log(firstName + "is saying " + text)
      setMessages((Messages) => [...Messages,{firstName,text}])

    })
    return () => {
      socket.disconnect()
    }
  },[userId,toUserId])
  
  const sendMessage = () => {
    try {
      const socket = createSocketConnection();
      socket.emit("sendchat",{
      firstName:user.firstName,
      userId,
      toUserId,
      text:NewMessages
    })
    } catch (error) {
      console.log("ERROR:"+error.message)      
    }
  }


  return(
    <div className=" bg-base-300">
      <div className=" w-1/2 mx-auto bg-base-200 border border-gray-700 flex flex-col h-[70vh] ">
        <h1 className="text-3xl p-5 flex justify-center text-white font-bold border-gray-600 ">Chat</h1>
      <div className="flex-1 overflow-scroll p-5 ">
        {Messages.map((msg,index) => {
          return(<div key={index}>
            <div className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
              <div className="chat-image avatar">
                 <div className="w-10 rounded-full">
                   <img
                     alt="Tailwind CSS chat bubble component"
                     src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                   />
                 </div>
               </div>
               <div className="chat-header">
               {msg.firstName + " " +msg.lastName}
               <time className="text-xs opacity-50">12:45</time>
               </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50"></div>
             </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
              </div>
              </div>
        {/* <div className="chat-bubble"></div> */}
         <div className="chat-footer opacity-50"></div>
       </div>
          </div>);
        })}</div>
      <div className="flex justify-center border border-gray-700 p-5 ">
        <input value={NewMessages} onChange={(e) => setNewMessages(e.target.value)}
        className=" flex-1 border border-gray-700 shadow-2xl" type="text"/>
        <button onClick={sendMessage}className=" mx-2 bg-red-500 hover:bg-red-700 rounded-sm text-white p-2">send</button>
      </div>
    </div></div>
  );
}

export default Chat;

