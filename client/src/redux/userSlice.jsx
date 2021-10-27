import { createSlice } from '@reduxjs/toolkit'
  
const userSlice = createSlice({
    name:"user",
    initialState:{
        userCredential: JSON.parse(localStorage.getItem("userCredential")) || null,
    isFetching:false,
    error:false,
    },
    reducers: {
        fetchingStart:(state)=>{
            state.userCredential=null;
            state.isFetching = true;
            state.error = false
        },
        fetchingSuccess:(state,action)=>{
            state.userCredential=action.payload;
            state.isFetching = false;
            state.error = false
        },
        fetchingError:(state)=>{
            state.userCredential=null;
            state.isFetching = false;
            state.error = true
        },
        logout:(state)=>{
            state.userCredential=null;
            state.isFetching = false;
            state.error = true
        },
        updateCredential:(state,action)=>{
            state.userCredential[0]=action.payload;
            state.isFetching = false;
            state.error = false
        },
    }
  })

  export const {fetchingError,fetchingStart,fetchingSuccess,logout,updateCredential} = userSlice.actions
  export default userSlice.reducer