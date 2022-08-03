import { React} from "react"
import { useState } from "react"
import logo from '../images/icon-left-font.png';
import '../App.css';
import AddOneposts from "../components/addOnePost";
import { useNavigate } from "react-router-dom";



function Home() {
  const navigate = useNavigate()
  if (document.cookie === '') {
    navigate("/Login")
  }
  


  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");




  const formData = new FormData();
  formData.append("post", post);
  formData.append("image", image);
  formData.append("cookies", document.cookie)

  let postSubmit = async (e) => {
    let date = new Date()
    formData.append("date", date)
    try {
      let res = await fetch("http://localhost:8000/api/post/", {
        method: "POST",
        Accept: "application/json",
        headers:
        { 
          'Authorization':`${document.cookie}`,
          'Accept': 'multipart/form-data',
        },
        body: formData
      });
      // let resJson = await res.json();
      if (res.status === 201) {
        setPost("");
        setImage(null);
        setMessage("Post created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="Home">
      <div className="logo+nav">
        <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        </header>
      </div>
      <div id="all-middle-div">
        <div id="post_create">
        <div className="create-Post">
        <h2 className="post-add-title">Ajouter un Post et exprimez-vous</h2>
          <form id="form-post" onSubmit={postSubmit}>
          <textarea className="text-addpost" value= {post} onChange={(e) => setPost(e.target.value)} name="post" rows="12" cols="35">Exprimez-vous</textarea>
          <div className="img-input" >
            {image && (
              <div className="img-create-post">
                <img alt="not fount" width={"250px"} src={URL.createObjectURL(image)} />
                <br />
                <button className="post-button" onClick={()=>setImage(null)}>Remove</button>
              </div>
            )}
            <br />
          
            <br /> 
            <div className="input-img">
              <input
                className="img-button"
                type="file"
                name="myimage"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="post">
            <button className="post-button" type="submit">Post</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
          </div>
            
          </form>
        </div>
        <div id="all-post">
        <AddOneposts/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
