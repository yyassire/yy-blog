import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {noImage} from "../../assets/images"
import {useState } from "react";
import storage from "../../firebase/firebaseConfig";
import axios from "axios";
import {logout, updateCredential } from "../../redux/userSlice";
import {useHistory} from "react-router-dom"
export default function Settings() {

  // HOOKS
  const dispatch = useDispatch()
  const userCredential = useSelector(state => state.user.userCredential)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [url, setUrl] = useState("")
  const [about,setAbout] = useState("")

  const history = useHistory()


  // VARIABLES
  const header = {headers:{ token: `Bearer ${userCredential[1]}` }}
  const body = {email:email || userCredential[0].email,password:password || userCredential[0].password,username:username ||userCredential[0].username,about:about ||userCredential[0].about,profilePicture:url ||userCredential[0].profilePicture, }

// FUNCTION
const handleFileLoad = (value)=>{
  if(value){
      const fileName = new Date().getTime() + value.name;
      const storageRef = storage.ref(`files/${fileName}`);      
      storageRef.put(value).on('state_changed', (snap) => {
      }, (err) => {
        setError(err);
      }, async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      });
}
}
const handleDelete = async()=>{
  const res  = await axios.delete(`/user/${userCredential[0]._id}`,header)
  res.data === "account deleted successfully" && dispatch(logout())
  res.data === "account deleted successfully" && history.push("/")
}
const handleSubmit = async(e)=>{
  e.preventDefault()
  const res = await axios.put(`/user/${userCredential[0]._id}`,body,header)
  res.data && dispatch(updateCredential(res.data))
  res.data && history.push("/")
}
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>Delete Account</span>
        </div>
        <form onSubmit={handleSubmit} className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={url ? url :userCredential[0].profilePicture ? userCredential[0].profilePicture: noImage}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
            onChange={(e)=>handleFileLoad(e.target.files[0])}
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder={userCredential[0].username} name="name" />
          <label>Email</label>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder={userCredential[0].email} name="email" />
          <label>Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" name="password" />
          <label>About You</label>
          <textarea onChange={(e)=>setAbout(e.target.value)} placeholder={userCredential[0].about} name="about" />
          <button className="settingsSubmitButton" type="submit" >
            Update
          </button>
        </form>
        {error && <span>{error}</span>}

      </div>
      <Sidebar />
    </div>
  );
}
