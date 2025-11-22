import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name:'Request',
  initialState:null,
  reducers:{
    addRequest:(state,action) => action.payload
  },
  removeRequest: () => null,
});

export const {addRequest,removeRequest} = RequestSlice.actions;

export default RequestSlice.reducer;