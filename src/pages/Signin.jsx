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

  let regExpEmail =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  let regExpName = /^[A-Z]+([ A-Za-z]+)*/;
  let regExpNoNumber = /^[^0-9()]+$/

  function controlemail(){
    if (regExpEmail.test(email)) {
        return true
    } else {
        return false
    }
  }
  function controlpassword(){
    if (password.length >= 4 && password.includes(" ") === false) {
      return true
    } else {
      return false
    }
  }
  function controlname(){
    if (regExpName.test(name) && regExpNoNumber.test(name) && name.length >= 2) {
        return true
    } else {
        return false
    }
  }
  function controlforename(){
    if (regExpName.test(forename) && regExpNoNumber.test(forename) && forename.length >= 2) {
        return true
    } else {
        return false
    }
  }
  function controljob(){
    if (regExpName.test(job) && regExpNoNumber.test(job) && job.length >= 2) {
        return true
    } else {
        return false
    }
  }



  let handleSubmit = async (e) => {

    e.preventDefault();

    if (controlemail() && controlpassword() && controlname() && controljob() && controlforename() ) {
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
    } else {
      setMessage ("Verifier que les informations soient correctes, le mot de passe ne peut pas contenir d'espace et doit faire 4 caractère minimum")
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
          type="email"
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