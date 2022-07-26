
  import { Link } from 'react-router-dom'
  import blacklogo from '../../images/icon-left-font-monochrome-white.png'
  import Signout from '../signout'

 
function Header() {
    return (
        <nav className='nav'>
        <div className='logo-div-acceuil'>
            <img className='logo-nav' src={blacklogo} alt='groupomanialogo'/>
            <Link className='Acceuil nav-link' to="/">Accueil</Link>
        </div>
                    <div className="login-signin-nav">
                        <Link className='nav-login nav-link' to="/Login">Login</Link>
                        <Link className='nav-signin nav-link' to="/Signin" >Signin</Link>
                        <Link className='nav-signin nav-link' to="/Login"
                        onClick={Signout} >Signout</Link>
            </div>
        </nav>
    )
}

export default Header