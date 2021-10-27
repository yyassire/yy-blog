import { useEffect, useState } from "react";
import {useSelector} from "react-redux"
import { axiosInstance } from "../../config";
import Post from "../post/Post";
import "./posts.css";

export default function Posts() {
  const info = useSelector(state => state.post.info)
  const [lists, setLists] = useState([])
  useEffect(() => {
    const fetchData = async ()=>{
      const res = await axiosInstance.get(`/post/all${info.cat ? "?cat="+info.cat:""}${info.username ? "?user="+info.username : ""}`);
      setLists(res.data)
    }
    fetchData()
  }, [info.cat,info.username])
  console.log(lists)
  return (
    <div className="posts">
      {lists.map((list,i)=>{
       return <Post key={i} list={list} />
      
      })}
    </div>
  );
}
