import '../../pages/App/App.css';
import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav className="nav-bar">
            <Link to="/boards">My Boards</Link>
            &nbsp; | &nbsp;
            <Link to="/boards/new">New Board</Link>
            &nbsp; | &nbsp;
            Welcome, {user.name}
            &nbsp; | &nbsp;
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}