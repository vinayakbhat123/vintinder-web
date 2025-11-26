import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const handlelogout = async () => {
    try {
      await axios.post(BASE_URL +"/logout", {},{ withCredentials: true})
      dispatch(removeUser())
      navigate("/login")
    } catch (error) {
      if (error?.response) {
        console.error(error?.response?.data)
      }
      console.error(error.message)
    }
  }
  return(
  <div className="navbar bg-base-200 shadow-sm p-10">
  <div className="flex-1">
    <Link to={"/feed"}className="btn btn-ghost text-3xl">VinTinder</Link>
  </div>
  {user && (
  <div className="flex gap-2">
      <div>welcome,{user.firstName}</div>
      <div className="dropdown dropdown-end mx-4 flex">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User photo"
            src={user ? user.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" }/>
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li> 
          <Link to={"/profile"} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to={"/connections"}>Connections</Link></li>
        <li><Link to={"/requests"}>Requests</Link></li>
         <li><Link to={"/premium"}>Premium</Link></li>
        <li><a onClick={handlelogout}>Logout</a></li>
      </ul>
    </div>
  </div> )}
</div>
)
}

export default Header;