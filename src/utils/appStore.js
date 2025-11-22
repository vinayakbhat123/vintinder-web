import {configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import RequestReducer from "./RequestSlice";
const appStore = configureStore({
  reducer:{
    user:userReducer,
    feed:feedReducer,
    connection:connectionReducer,
    Request:RequestReducer,
  }
});

export default appStore;