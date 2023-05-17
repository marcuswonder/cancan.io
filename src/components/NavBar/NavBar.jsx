import './NavBar.css';
import { Link } from 'react-router-dom'
import logo from '../../public/assets/idea.png'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav className="nav-bar">
            <div className="nav-bar-links">
                <div className="logo"><Link to="/"><img className="logo" src={logo} alt='go home' /></Link></div>
                <div><Link to="/boards"><button className="menu-item">my boards</button></Link></div>
            </div>
            <div className="nav-bar-auth">
                <div><Link to="" onClick={handleLogOut}><button className="menu-item">log out of {user.name}</button></Link></div>
            </div>
        </nav>
    )
}