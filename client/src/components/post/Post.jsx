import { Link } from "react-router-dom";
import { format } from 'timeago.js';
import "./post.css";

export default function Post({list}) {
  return (
    <div className="post">
  {list.photo &&     <img
        className="postImg"
        src={list.photo}
        alt=""
      />}
      <div className="postInfo">
        <div className="postCats">
        {list.category.map((cat,i)=>{
          return      <span key={i} className="postCat">
          <span   className="link" >
            {cat}
          </span>
        </span>
        })}
       </div>
        <span className="postTitle">
          <Link  to={"/post/"+list._id} className="link">
            {list.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{format(list.createdAt)}</span>
      </div>
      <p className="postDesc">
      {list.desc}
      </p>
    </div>
  );
}
