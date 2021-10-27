import "./About.css"
import Sidebar from "../../components/sidebar/Sidebar";
import {  useSelector } from "react-redux";
import {noImage} from "../../assets/images"
import {Link} from "react-router-dom"




export default function About() {
  // HOOKS
  const userCredential = useSelector(state => state.user.userCredential)
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Your Personnel Information</span>
        </div>
        <div className="settingsForm">
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={userCredential[0].profilePicture ? userCredential[0].profilePicture: noImage}
              alt=""
            />
          </div>
          <span>Username :  <span>{userCredential[0].username} </span></span>
         
           <span>Email :  <span>{userCredential[0].email} </span></span>
         
          <span>About ME :   <span>{userCredential[0].about} </span></span>
        
          <Link className="aboutLingBtn"to="/settings" >
            Update
          </Link>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
