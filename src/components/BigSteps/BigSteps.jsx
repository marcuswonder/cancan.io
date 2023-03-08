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

    return (
        <>
            {bigSteps.length ?
            <div>
                <h2>Big Steps List for {boardNameActual}</h2>
                    <div>
                        {bigSteps.map(step => (
                            <Link to={`/boards/${boardName}/${step.title.replace(/\s+/g, '-')}`} key={step._id}>
                            <p>{step.title}</p>
                            </Link>
                    ))}
                    </div>
            </div>

        :
        <p>Create some new boards!</p>
        }
            <Link to={`/boards/${boardName}/big-steps/add`}><button>Add Big Step</button></Link>
            
        </>
    )
}