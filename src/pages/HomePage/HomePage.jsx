import './HomePage.css';
import { Link } from 'react-router-dom'
import logo from '../../public/assets/idea.png'
import { useState, useEffect } from 'react'

export default function HomePage({user, setUser}) {
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
            <div className="home-container">
                <img className="home-logo" src={logo} alt='cancan logo'/>
                <h1 className="home-header">{messages[messageIndex]}</h1>
                
                <div>
                    {
                        user ? 
                        <>
                            <Link to={`/boards`} ><button>Get Started!</button></Link>
                        </>
                        :
                        <>

                            <div className="button-container">
                                <Link to={`/boards`}><button className="home-button">my boards</button></Link>
                                <Link to={`/boards/new`}><button className="home-button">new board</button></Link>
                            </div>
                        </>   
                    }
                </div>
            </div>
            
        </>
    )
}