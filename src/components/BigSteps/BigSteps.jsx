import '../../pages/App/App.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import * as bigStepsAPI from '../../utilities/big-steps-api'

export default function BigSteps() {
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    const [bigSteps, setBigSteps] = useState([])
    
    useEffect(function() {
        async function getBigSteps() {
            let bigSteps = []
            bigSteps = await bigStepsAPI.getBigSteps()
            setBigSteps(bigSteps)
        }
        getBigSteps()
    }, [])


    function handleDeleteClick() {

    }

    return (
        <>
            {bigSteps.length ?
            <div>
                <h2>Big Steps List for {boardNameActual}</h2>
                    <div>
                        {bigSteps.map(step => (
                            <Link to={`/boards/${boardName}/${step.title.replace(/\s+/g, '-')}`} key={step._id}>
                            <div className="big-step-card">
                                <p>Title: {step.title}</p>
                                <p>Description: {step.description}</p>
                                <p>Due: {step.due}</p>
                                <p>Author: {step.author.name}</p>
                                <p>Responsible: {step.responsible.name}</p>
                                <Link to={`/boards/${boardName}/update`} ><button>Update Big Step</button></Link>
                                <button onClick={handleDeleteClick}>Delete Big Step</button>
                            </div>
                            </Link>
                    ))}
                    </div>
            </div>

        :
        <p>Add some Big Steps to your project!</p>
        }
            <Link to={`/boards/${boardName}/big-steps/add`}><button>Add Big Step</button></Link>
            
        </>
    )
}