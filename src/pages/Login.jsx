import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/icon-left-font.png';
// import { set } from "mongoose";


function App() {

  const credentials =[]

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
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
        navigate("/")
        credentials.push(resJson)
        localStorage.setItem("credentials", JSON.stringify(credentials))
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}


export default App;

