import { createSlice } from '@reduxjs/toolkit'
  
const userSlice = createSlice({
    name:"post",
    initialState:{
        userCredential: null,
    isFetching:false,
    error:false,
    info:{
        cat:null,
        username:null,
    },
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
        update:(state,action)=>{
            state.info.cat=action.payload.cat;
            state.info.username=action.payload.username
        },
    }
  })

  export const {update} = userSlice.actions
  export default userSlice.reducer