import { useParams, Link } from 'react-router-dom'

export default function BigSteps() {
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    return (
        <>
            <h2>Big Steps</h2>
            <Link to={`/boards/${boardName}/big-steps/add`}><button>Add Big Step</button></Link>
            
        </>
    )
}