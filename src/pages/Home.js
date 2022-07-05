import { useState } from "react"
import logo from '../images/icon-left-font.png';
import '../App.css';
import { Image } from "react"


function Home() {
  
  const [selectedImage, setSelectedImage] = useState(null);
  
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
        <form id="form-post">
          <input
            type="text"
            value="text"
            placeholder="text"
            // onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            {selectedImage && (
              <div>
              <Image alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
              <br />
              <button onClick={()=>setSelectedImage(null)}>Remove</button>
              </div>
            )}
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
      <div id="all-post">
      <article>
        <img/>
        <h2>Nom Prénom</h2>
        <p>Text</p>
        <form>
          <input
            type="text"
            value="text"
            placeholder="text"
            // onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Commenter</button>
          <button type="submit">Modifier (juste pour la personne ayant poster)</button>
        </form>
      </article>
      </div>
      </div>
    </div>
  );
}

export default Home;
