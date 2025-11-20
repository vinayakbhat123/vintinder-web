import {BrowserRouter,Route,Routes} from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed";
function App() {
  return (
    <div className="bg-black">
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
         <Route path="/login" element={<Login/>}/>
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/feed" element={<Feed/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
