import { NavLink } from "react-router-dom";
import "./topbar.css";
import {useDispatch, useSelector} from "react-redux"
import { logout } from "../../redux/userSlice";
import {noImage} from "../../assets/images"
import { useEffect, useState } from "react";
import { Close, Menu } from "@mui/icons-material"

export default function Topbar() {
  const userCredential = useSelector(state => state.user.userCredential)
  const [phone,setPhone] = useState(false)
  const [sidebarOpened,setSidebarOpened] = useState(false)
 const dispatch = useDispatch()
 useEffect(() => {
  if(window.innerWidth < 950){
      setPhone(true)
  }
}, [])
useEffect(() => {
  const handleResize = ()=>{
   if(window.innerWidth < 950){
       setPhone(true)
   }else{setPhone(false)
       setSidebarOpened(false)
  }
  }
window.addEventListener("resize",handleResize)
return ()=> window.removeEventListener("resize",handleResize)
}, [])
  return (
    <div className="top">
     {!phone && (<>
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <NavLink activeClassName="active" className="link" exact to="/">
              HOME
            </NavLink>
          </li>
          <li className="topListItem">
            <NavLink activeClassName="active" className="link" to="/about">
              ABOUT
            </NavLink>
          </li>
          <li className="topListItem">
            <NavLink activeClassName="active" className="link" to="/write">
              WRITE
            </NavLink>
          </li>
          {userCredential && <li className="topListItem" onClick={()=>{dispatch(logout())}}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {userCredential ? (
          <NavLink activeClassName="active" className="link" to="/settings">
            <img
              className="topImg"
              src={userCredential && userCredential[0].profilePicture ? userCredential[0].profilePicture : noImage}
              alt=""
            />
          </NavLink>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <NavLink activeClassName="active" className="link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="topListItem">
              <NavLink activeClassName="active" className="link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
     </>)}
     {/* _________________________PHONE___________________________ */}
      {phone &&    <div className="sidebarPhoneIcon">
      {sidebarOpened ?<Close onClick={()=>{setSidebarOpened(false)}} className="menu menuClose"/> :<Menu onClick={()=>{setSidebarOpened(true)}}  className="menu menuOpen"/>}
      </div>}
     {phone && (<div className={sidebarOpened ? "topBarPhone open":"topBarPhone close"}>
   
     <div className="topRightPhone">
        {userCredential ? (
          <NavLink activeClassName="active" className="link" to="/settings">
            <img
             onClick={()=>{setSidebarOpened(false)}}
              className="topImg"
              src={userCredential && userCredential[0].profilePicture ? userCredential[0].profilePicture : noImage}
              alt=""
            />
          </NavLink>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <NavLink onClick={()=>{setSidebarOpened(false)}} className="link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="topListItem">
              <NavLink  onClick={()=>{setSidebarOpened(false)}} className="link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    
      <div className="topCenterPhone">
        <ul className="topListPhone">
          <li onClick={()=>{setSidebarOpened(false)}} className="topListItemPhone">
            <NavLink className="link" exact to="/">
              HOME
            </NavLink>
          </li>
          <li onClick={()=>{setSidebarOpened(false)}} className="topListItemPhone">
            <NavLink className="link" to="/about">
              ABOUT
            </NavLink>
          </li>
          <li onClick={()=>{setSidebarOpened(false)}} className="topListItemPhone">
            <NavLink className="link" to="/write">
              WRITE
            </NavLink>
          </li>
          {userCredential && <li className="topListItemPhone"  onClick={()=>{dispatch(logout()); setSidebarOpened(false)}}>LOGOUT</li>}
        </ul>
      </div>
      <div className="topLeft" onClick={()=>{setSidebarOpened(false)}}>
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
     </div>)}
    </div>
  );
}
