import { useRef, useState } from "react";
import "./write.css";
import storage from '../../firebase/firebaseConfig';
import axios from "axios"
import {categoriesSelect} from "../../assets/data"
import {useSelector} from "react-redux"
import {postImag} from "../../assets/images"


export default function Write() {
  const userCredential = useSelector(state => state.user.userCredential)
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [file, setFile] = useState("");
  const categoryRef = useRef()


// FUNTIONS
  const downloadUrl = ()=>{
      // references
      const fileName = new Date().getTime() + file.name;
      const storageRef = storage.ref(`files/${fileName}`);      
      storageRef.put(file).on('state_changed', (snap) => {
        
      }, (err) => {
        setError(err);
      }, async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      });
   
  }
  const handleSubmit = async (e)=>{
  e.preventDefault()
  const res = await axios.post("/post",{title,desc:story,photo:url ?url:"",username:userCredential[0].username,category:categoryRef.current.value})
  res.data && window.location.replace("/")
  }
  return (
    <div className="write">
   <div className="img">
   <img
        className="writeImg"
        src={url ? url:postImag}
        alt=""
      />
   </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput"  type="file" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            required
            onChange={(e)=>setTitle(e.target.value)}
          />
         
        </div>
        <select 
            className="writeInput select" defaultValue="choice"  required>
              <option value="choice" disabled >choose a category</option>
           {categoriesSelect.map((cat,i)=>{
           return  <option value={cat} key={i} ref={categoryRef}>{cat}</option>
           })}
          </select>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            required
            onChange={(e)=>setStory(e.target.value)}

          />
        </div>
      {url ?  <button className="writeSubmit" type="submit">
          Publish
        </button>:   <button className="writeSubmit" type="button" onClick={downloadUrl}>
          Create
        </button>
        }
        
      </form>
      {error && <span>some error occur during the loading</span>}
    </div>
  );
}
