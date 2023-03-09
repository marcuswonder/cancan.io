import './SplashPage.css';
import { Link, Routes, Route } from 'react-router-dom'
import logo from '../../public/assets/idea.png'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function SplashPage({user, setUser}) {

    return (
        <>
            <div className="splash-container">
                <img className="splash-logo" src={logo} alt='cancan logo'/>
                <h1 className="splash-header">welcome to cancan</h1>
                
                <div>
                    {
                        user ? 
                        <>
                            <Link to={`/boards`} ><button>Get Started!</button></Link>
                        </>
                        :
                        <>
                            <Routes>
                                <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
                                <Route path="/login" element={<LoginForm setUser={setUser} />} />
                            </Routes>

                            <Link to={`/login`} className="splash-button"><button>Login</button></Link>
                            <Link to={`/signup`} className="splash-button"><button>Signup</button></Link>
                        </>   
                    }
                </div>
            </div>
            
        </>
    )
}