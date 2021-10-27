import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { format } from 'timeago.js';
import { update } from "../../redux/postSlice";
import {useHistory} from "react-router-dom"
import "./singlePost.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";

export default function SinglePost() {
  const userCredential = useSelector(state => state.user.userCredential)
  const location = useLocation()
  const [post, setPost] = useState("");
  const id =  location.pathname.split("/")[2]
 useEffect(() => {
  const fetchData = async ()=>{
     const res = await axiosInstance.get(`/post/single/${id}`)
     setPost(res.data)
  }
  fetchData()
 }, [id])
  const dispatch = useDispatch()
   const history = useHistory()
   const handleClick = ()=>{
    dispatch(update({username:post.username,cat:null}))
    history.push("/")
   }

   if(!post){
     return <h1>LOADING...</h1>
   }
   const handleDelete = async()=>{
try {
  const header = {headers:{ token: `Bearer ${userCredential[1]}` }}

   await axiosInstance.delete(`/post/${post._id}`,header)
   history.push("/")
  
} catch (error) {
  console.log(error)
  
}     
   }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      {post.photo &&     <img
          className="singlePostImg"
          src={post.photo}
          alt=""
        />}
        <h1 className="singlePostTitle">
          {post.title}
          {userCredential && userCredential[0].username === post.username &&   <div className="singlePostEdit">
          
          <Link  to={`/edit/${post._id}`}> <i className="singlePostIconEdit far fa-edit">
            </i>
            </Link>
            <i className="singlePostIconDelete far fa-trash-alt" onClick={handleDelete}></i>
          </div>}
        
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <span className="link" style={{pointer:"cursor"}} onClick={handleClick} >
                {post.username}
              </span>
            </b>
          </span>
          <span>{format(post.createdAt)}</span>
        </div>
        <p className="singlePostDesc">
        {post.desc}
        </p>
      </div>
    </div>
  );
}
