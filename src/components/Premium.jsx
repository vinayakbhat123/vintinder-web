import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { useState } from "react";

const Premium = () => {
  const [isUserPremium,setisUserPremium] = useState(false)

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/payment/verify",{withCredentials:true})
    if(res.data.isPremium){
      setisUserPremium(true)
    }
  }

  const handleBuyClick = async (type) => {
    try {
      // console.log("clicked"+type)
      const order = await axios.post(BASE_URL + "/payment/create",{membershipType:type,},{withCredentials:true})
      const {key_id,amount,currency,orderId,notes} = order.data
      // console.log(order.data)
      const options = {
        key: key_id, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'VinTinder',
        description: 'Connect with others Developers',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emilId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser(),
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("ERROR:"+error.message)
    }
    
  }
  return(isUserPremium ? "You are alerady Premium Member"
     :
    <div className="bg-base-300">
      <div className="flex m-10  w-full">
       <div className="card bg-gray-700 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold">Silver Memberships</h1>
        <ul >
          <li>Chat with others</li>
          <li>100 connectios per day</li>
          <li>Blue Tick</li>
          <li>3 Months</li>
        </ul>
        <button onClick={() => handleBuyClick("silver")} className="bg-red-500 text-white rounded-3xl w-24 shadow-2xl ">Buy Now</button>
       </div>
         <div className="divider divider-horizontal">OR</div>
      <div className="card bg-gray-700 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold">Gold Meberships</h1>
         <ul >
          <li>Chat with others</li>
          <li>Unlimited connectios per day</li>
          <li>Blue Tick</li>
          <li>Discord Comunity Access</li>
          <li>6 Months</li>
        </ul>
        <button onClick={() => handleBuyClick("gold")}className="bg-pink-500 text-white rounded-3xl w-24 shadow-2xl ">Buy Now</button>
      </div>
</div>
    </div>
  );
}

export default Premium;