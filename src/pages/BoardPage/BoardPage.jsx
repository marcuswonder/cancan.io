import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'
import BoardDetail from '../../components/BoardDetail/BoardDetail'
import StepsPage from '../StepsPage/StepsPage'


export default function BoardPage({user}) {
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    
    const [board, setBoard] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(function() {
        async function getBoard() {
            const board = await boardsAPI.getUserBoard(boardNameActual)
          setBoard(board)
        }
        getBoard()
        setIsLoading(false)

    }, [boardNameActual])
    
    if (isLoading) {
        return <div>Loading...</div>
      }
    
      
      return (
        <>
            <BoardDetail user={user} board={board} />
            {!isLoading && <StepsPage user={user} board={board} setBoard={setBoard} />}
        </>
    )
}