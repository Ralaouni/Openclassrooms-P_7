import logo from '../images/icon-left-font.png'

function Signin() {
    return (
  <div>
      <div>
        <img src={logo} className="Login-logo" alt="logo" />
      </div>
   <div className="form">
     <form>
       <div className="input-container">
         <label>Email </label>
         <input type="email" name="email" required />
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required />
       </div>
       <div className="button-container">
         <input type="submit" value="Sign in" />
       </div>
     </form>
   </div>
  </div>
)
}

export default Signin;