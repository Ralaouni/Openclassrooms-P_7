
  import { Link } from 'react-router-dom'

 
function Header() {
    return (
        <nav className='nav'>
            <Link to="/">Accueil</Link>
            <div>
                <Link to="/Login">Login</Link>
                <Link to="/Signin">Signin</Link>
            </div>
        </nav>
    )
}

export default Header