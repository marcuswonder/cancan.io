import './BoardPage.css';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'
import BoardDetail from '../../components/BoardDetail/BoardDetail'
import StepsPage from '../StepsPage/StepsPage'



export default function BoardPage({user}) {
  const { boardName } = useParams()
  const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
  const [board, setBoard] = useState({})

  useEffect(function() {
      async function getBoard() {
          const board = await boardsAPI.getBoard(boardNameActual)
          setBoard(board)
      }
      getBoard()
  }, [boardNameActual, setBoard])

  
      return (
        <>
            <BoardDetail user={user} board={board} setBoard={setBoard} />
            <StepsPage user={user} board={board} setBoard={setBoard} />
        </>
      )

    }
