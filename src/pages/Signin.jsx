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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import logo from '../images/icon-left-font.png'

async function signupUser(credentials) {

 return fetch('http://localhost:8000/api/auth/signup', {

   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Signup({ setToken }) {

  const [email, setemail] = useState();

  const [password, setPassword] = useState();

  const handleSubmit = async e => {

    e.preventDefault();

    const token = await signupUser({
      email,
      password
    });

    setToken(token);
    console.log(email)
  }

  return(

    <div className="form">
      <div>
        <img src={logo} className="Login-logo" alt="logo" />
      </div>
      <h1>Please Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-container">
          <p>email</p>
          <input type="text" onChange={e => setemail(e.target.value)} />
        </label>
        <label className="input-container">
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label className="input-container">
          <p>Nom</p>
          <input type="text"  />
        </label>
        <label className="input-container">
          <p>email</p>
          <input type="text" />
        </label>
        <label className="input-container">
          <p>email</p>
          <input type="text" />
        </label>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Signup.propTypes = {

  setToken: PropTypes.func.isRequired

};