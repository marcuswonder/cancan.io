import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'
import BoardDetail from '../../components/BoardDetail/BoardDetail'
import StepsPage from '../StepsPage/StepsPage'
// import BigSteps from '../../components/BigSteps/BigSteps'
// import BabySteps from '../../components/BabySteps/BabySteps'

export default function BoardPage({user}) {
    const { boardName, bigStepName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    


    const [board, setBoard] = useState({})
    const [bigSteps, setBigSteps] = useState([])
    

    useEffect(function() {
        async function getBoard() {
            const boards = await boardsAPI.getUserBoard(boardNameActual)
          setBoard(boards)
        }
        getBoard()
    }, [boardNameActual])
    
    useEffect(function() {
        async function getBoardBigSteps() {
            let bigSteps = []
            bigSteps = await boardsAPI.getBoardBigSteps(boardNameActual)
            setBigSteps(bigSteps)
        }
        getBoardBigSteps()
    }, [boardNameActual])




    return (
        <>
            <BoardDetail user={user} board={board} />
            <StepsPage user={user} board={board} bigSteps={bigSteps} setBigSteps={setBigSteps} boardName={boardName}/>
        </>
    )
}