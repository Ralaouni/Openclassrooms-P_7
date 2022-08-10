import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/icon-left-font.png'


function App() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [forename, setForename] = useState("");
  const [job, setJob] = useState("");
  const [message, setMessage] = useState("");


  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          forename: forename,
          job: job,
        }), 
      });
      if (res.status === 201) {
        setEmail("");
        setPassword("");
        setName("");
        setForename("");
        setJob("");
        setMessage("User created successfully");
        navigate("/")
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
      <form className="log-form"  onSubmit={handleSubmit}>
        <input 
          className="log-input"
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span id="Email" className="erromsg"></span>
        <input
          className="log-input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="log-input"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <span id="Name" className="erromsg"></span>
        <input
          className="log-input"
          type="text"
          value={forename}
          placeholder="Forename"
          onChange={(e) => setForename(e.target.value)}
        />
        <span id="Forename" className="erromsg"></span>
        <input
          className="log-input"
          type="text"
          value={job}
          placeholder="Job"
          onChange={(e) => setJob(e.target.value)}
        />
        <span id="job" className="erromsg"></span>

        <button className="log-button"  type="submit">Sign Up</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;