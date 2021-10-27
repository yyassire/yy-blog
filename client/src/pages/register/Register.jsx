import { useState } from "react"
import "./register.css"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"

export default function Register() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const history = useHistory()
  // functions
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post("/auth/register",{username,email,password})
      res.data && history.push("/login")
    } catch (error) {
      console.log(error)
      
    }
  }

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" required type="text" placeholder="Enter your username..." onChange={(e)=>setUsername(e.target.value)} />
        <label>Email</label>
        <input className="registerInput" required type="text" placeholder="Enter your email..." onChange={(e)=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" required type="password" placeholder="Enter your password..."onChange={(e)=>setPassword(e.target.value)} />
        <button className="registerButton">Register</button>
      </form>
        <Link to="/login"><button className="registerLoginButton">Login</button></Link>
    </div>
    )
}
