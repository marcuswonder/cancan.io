import './SplashPage.css';
import { Link, Routes, Route } from 'react-router-dom'
import logo from '../../public/assets/idea.png'
import { useState, useEffect } from 'react'

export default function SplashPage({user, setUser}) {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
        'they can', 
        'you can', 
        'we all can!', 
        'we all can!', 
        'welcome to cancan',
        'welcome to cancan',
        'welcome to cancan',
        'welcome to cancan',
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
          setMessageIndex((messageIndex + 1) % messages.length);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [messageIndex, messages.length]);


    return (
        <>
            <div className="splash-container">
                <img className="splash-logo" src={logo} alt='cancan logo'/>
                <h1 className="splash-header">{messages[messageIndex]}</h1>
                
                <div>
                    {
                        user ? 
                        <>
                            <Link to={`/boards`} ><button>Get Started!</button></Link>
                        </>
                        :
                        <>

                            <div className="button-container">
                                <Link to={`/login`}><button className="splash-button">Login</button></Link>
                                <Link to={`/signup`}><button className="splash-button">Signup</button></Link>
                            </div>
                        </>   
                    }
                </div>
            </div>
            
        </>
    )
}