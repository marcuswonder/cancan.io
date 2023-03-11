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
    
    


    
    // useEffect(function() {
    //     async function getBoardBigSteps() {
    //         let bigSteps = []
    //         bigSteps = await boardsAPI.getBoardBigSteps(boardNameActual)
    //         setBigSteps(bigSteps)
    //     }
    //     getBoardBigSteps()
    // }, [boardNameActual])
    

    return (
        <>
            {/* {!isLoading && <BoardDetail user={user} board={board} />}
            {!isLoading && <StepsPage user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} boardName={boardName}/>} */}
            <BoardDetail user={user} board={board} />
            {!isLoading && <StepsPage user={user} board={board} setBoard={setBoard} />}
        </>
    )
}