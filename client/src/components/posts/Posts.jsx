import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import Post from "../post/Post";
import "./posts.css";
import axios from "axios"

export default function Posts() {
  const info = useSelector(state => state.post.info)
  const [lists, setLists] = useState([])
  useEffect(() => {
    const fetchData = async ()=>{
      const res = await axios.get(`/post/all${info.cat ? "?cat="+info.cat:""}${info.username ? "?user="+info.username : ""}`);
      setLists(res.data)
    }
    fetchData()
  }, [info.cat,info.username])
  return (
    <div className="posts">
      {lists.map((list)=>{
       return <Post key={list._id} list={list} />
      
      })}
    </div>
  );
}
