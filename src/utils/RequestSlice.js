import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name:'Request',
  initialState:null,
  reducers:{
    addRequest:(state,action) => action.payload
  },
  removeRequest: (state,action) => {
    const newarray = state.filter((r) => r._id !== action.payload)
    return newarray;
  }
});

export const {addRequest,removeRequest} = RequestSlice.actions;

export default RequestSlice.reducer;