import {noImage} from "../../assets/images"
import "./sidebar.css";
import {categories} from "../../assets/data"
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/postSlice";
import {Link} from "react-router-dom"


export default function Sidebar() {
  const dispatch = useDispatch()

  
  const userCredential = useSelector(state => state.user.userCredential)

  const handleCat = (cat)=>{
     if(cat === "all"){
       return dispatch(update({cat:null,username:null}))
       
     }
     dispatch(update({cat:cat,username:null}))
  }
  return (
    <div className="sidebar">
     {userCredential &&  <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
      <Link to="/settings">  <img
          src={userCredential[0].profilePicture ? userCredential[0].profilePicture :noImage}
          alt=""
        />
        </Link>
        <p>
        { userCredential[0].about && userCredential[0].about}
        </p>
      </div>}
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {categories.map((cat,index)=>{
          return   <li key={index} className="sidebarListItem">
          <span className="link" onClick={()=>{handleCat(cat)}} >
            {cat}
          </span>
        </li>
        })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
