
import { useParams } from 'react-router-dom'

export default function BoardsDetail() {
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    return (
        <>
            <h2>Board Detail</h2>
            <p>{boardNameActual}</p>
        </>
    )
}