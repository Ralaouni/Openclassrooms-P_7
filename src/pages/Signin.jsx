// import logo from '../images/icon-left-font.png'

// function Signin() {
//     return (
//   <div>
//       <div>
//         <img src={logo} className="Login-logo" alt="logo" />
//       </div>
//   <div className="form">
//     <form>
//       <div className="input-container">
//         <label>Email </label>
//         <input type="email" name="email" required />
//       </div>
//       <div className="input-container">
//         <label>Password </label>
//         <input type="password" name="pass" required />
//       </div>
//       <div className="input-container">
//         <label>Nom </label>
//         <input type="text" name="name" required />
//       </div>
//       <div className="input-container">
//         <label>Prénom  </label>
//         <input type="text" name="forename" required />
//       </div>
//       <div className="input-container">
//         <label>Travail  </label>
//         <input type="text" name="travail" required />
//       </div>
//       <div className="button-container">
//         <input type="submit" value="Sign in" />
//       </div>
//     </form>
//   </div>
//   </div>
// )
// }

// export default Signin;



// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import logo from '../images/icon-left-font.png'

// async function signupUser(credentials) {

//  return fetch('http://localhost:8000/api/auth/signup', {

//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }

// export default function Signup({ setToken }) {

//   const [email, setemail] = useState();

//   const [password, setPassword] = useState();

//   const handleSubmit = async e => {

//     e.preventDefault();

//     const token = await signupUser({
//       email,
//       password
//     });

//     setToken(token);

//   }

//   return(

//     <div className="form">
//       <div>
//         <img src={logo} className="Login-logo" alt="logo" />
//       </div>
//       <h1>Please Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <label className="input-container">
//           <p>email</p>
//           <input type="text" onChange={e => setemail(e.target.value)} />
//         </label>
//         <label className="input-container">
//           <p>Password</p>
//           <input type="password" onChange={e => setPassword(e.target.value)} />
//         </label>
//         <label className="input-container">
//           <p>Nom</p>
//           <input type="text"  />
//         </label>
//         <label className="input-container">
//           <p>Prenom</p>
//           <input type="text" />
//         </label>
//         <label className="input-container">
//           <p>Job</p>
//           <input type="text" />
//         </label>
//         <div className="button-container">
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// Signup.propTypes = {

//   setToken: PropTypes.func.isRequired

// };

import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/icon-left-font.png'
// import { set } from "mongoose";

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
      let resJson = await res.json();
      console.log(resJson)
      if (res.status === 201) {
        setEmail("");
        setPassword("");
        setName("");
        setForename("");
        setJob("");
        setMessage("User created successfully");
        navigate("/Login")
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // let Loginfunction = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res = await fetch("http://localhost:8000/api/auth/login", {
  //       method: "POST",
  //       headers: { 
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }), 
  //     });
  //     let resJson = await res.json();
  //     if (res.status === 200) {
  //       setEmail("");
  //       setPassword("");
  //       setMessage("User logged in successfully");
  //       document.cookie=`userId=${resJson.userId}`
  //       document.cookie=`token=${resJson.token}`
  //       document.cookie=`name=${resJson.name}`
  //       document.cookie=`forename=${resJson.forename}`
  //       document.cookie=`job=${resJson.job}`
  //       navigate("/")
  //     } else {
  //       setMessage("Some error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
        <input
          className="log-input"
          type="text"
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
        <input
          className="log-input"
          type="text"
          value={forename}
          placeholder="Forename"
          onChange={(e) => setForename(e.target.value)}
        />
        <input
          className="log-input"
          type="text"
          value={job}
          placeholder="Job"
          onChange={(e) => setJob(e.target.value)}
        />

        <button className="log-button"  type="submit">Sign Up</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;