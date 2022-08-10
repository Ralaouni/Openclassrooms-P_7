import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/icon-left-font.png';


function App() {


  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {

    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }), 
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        setMessage("User logged in successfully");
        document.cookie=`userId=${resJson.userId}`
        document.cookie=`token=${resJson.token}`
        document.cookie=`name=${resJson.name}`
        document.cookie=`forename=${resJson.forename}`
        document.cookie=`job=${resJson.job}`
        navigate("/Home")
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    
  };


  

  return (
    <div className="App">
      <div>
        <img src={logo} className="Login-logo" alt="logo" />
      </div>
      <form className="log-form" onSubmit={handleSubmit}>
        <input
          className="log-input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="log-input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="log-button" type="submit">Log In</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}


export default App;

