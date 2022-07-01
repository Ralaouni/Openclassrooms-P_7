// import logo from '../images/icon-left-font.png'

// function Login() {
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
//       <div className="button-container">
//         <input type="submit" value="Login" />
//       </div>
//     </form>
//   </div>
//   </div>
// )
// }

// export default Login;



import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {

 return fetch('http://localhost:8000/api/authlogin', {

   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {

  const [email, setemail] = useState();

  const [password, setPassword] = useState();

  const handleSubmit = async e => {

    e.preventDefault();

    const token = await loginUser({
      email,
      password
    });

    setToken(token);

  }

  return(

    <div className="form">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="input-container">
          <p>email</p>
          <input type="text" onChange={e => setemail(e.target.value)} />
        </label>
        <label className="input-container">
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {

  setToken: PropTypes.func.isRequired

};