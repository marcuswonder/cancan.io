import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'

export default function BigSteps() {
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    
    // useEffect(function() {
    //     async function getBigSteps() {
    //         let bigSteps = []
    //         bigSteps = await boardsAPI.getBigSteps()
    //         console.log("bigSteps", bigSteps)
    //     }
    //     getBigSteps()
    // }, [])

    return (
        <>
            <h2>Big Steps</h2>
            <Link to={`/boards/${boardName}/big-steps/add`}><button>Add Big Step</button></Link>
            
        </>
    )
}