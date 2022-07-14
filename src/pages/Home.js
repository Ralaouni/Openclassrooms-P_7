import { useState } from "react"
import logo from '../images/icon-left-font.png';
import '../App.css';
import App from './Login'
// import { Image } from "react"


function Home() {

  console.log(App)

  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");


  const formData = new FormData();
  formData.append("post", post);
  formData.append("image", image);

  let postSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/api/post/", {
        method: "POST",
        Accept: "application/json",
        headers: { 
          'Authorization':'credentials',
          'Accept': 'multipart/form-data'
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
      <nav className="home-menu">
        <h1> Menu </h1>
        <ul>
          <li>Mes post</li>
          <li>Personnes connectées</li>
          <li>Sign out</li>
        </ul>
      </nav>
      </div>
      <div id="post+create">
      <div className="create-Post">
        <form id="form-post" onSubmit={postSubmit}>
        <textarea value= {post} onChange={(e) => setPost(e.target.value)} name="post" rows="12" cols="35">Exprimez-vous</textarea>
        <div >
          {image && (
            <div>
            <img alt="not fount" width={"250px"} src={URL.createObjectURL(image)} />
            <br />
            <button onClick={()=>setImage(null)}>Remove</button>
            </div>
          )}
          <br />
         
          <br /> 
          <input
            type="file"
            name="myimage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setImage(event.target.files[0]);
            }}
          />
        </div>
          <button type="submit">Post</button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <div id="all-post">
      <article>
        {/* <img/> */}
        <h2>Nom Prénom</h2>
        <p>Text</p>
        <form>
          <button type="submit">Supprimer</button>
          <button type="submit">Modifier (juste pour la personne ayant poster)</button>
        </form>
      </article>
      </div>
      </div>
    </div>
  );
}

export default Home;
