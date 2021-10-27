import "./login.css";
import {useDispatch} from "react-redux"
import { useState } from "react";
import { fetchingError, fetchingStart, fetchingSuccess } from "../../redux/userSlice";
import {Link} from "react-router-dom"
import { axiosInstance } from "../../config";


export default function Login() {
  const  dispatch = useDispatch()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  // functions
  const handleSubmit = async (e)=>{
e.preventDefault()
email && password && dispatch(fetchingStart())
try {
  const res = await axiosInstance.post("/auth/login",{email,password})
  dispatch(fetchingSuccess(res.data))
} catch (error) {
  dispatch(fetchingError())

  
}
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Email</label>
        <input className="loginInput" required onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="loginInput" required onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter your password..." />
        <button className="loginButton">Login</button>
      </form>
       <Link to="/register">  <button className="loginRegisterButton">Register</button></Link>
    </div>
  );
}
