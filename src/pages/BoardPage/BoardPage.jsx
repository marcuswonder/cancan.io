import './BoardPage.css';
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'
import BoardDetail from '../../components/BoardDetail/BoardDetail'
import StepsPage from '../StepsPage/StepsPage'
import logo from '../../public/assets/idea.png'


export default function BoardPage({user}) {
  const { boardName } = useParams()
  const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
  const [board, setBoard] = useState({})
  const [isLoading, setIsLoading] = useState(true)  
  const [error, setError] = useState(null)  
  

  // useEffect(function() {
  //     async function getBoard() {
  //         const board = await boardsAPI.getUserBoard(boardNameActual)
  //       setBoard(board)
  //       setIsLoading(false)
  //     }
  //     getBoard()
  // }, [boardNameActual, setBoard])

  useEffect(function() {
    async function getBoard(user) {
      try {
        const board = await boardsAPI.getUserBoard(boardNameActual);
        console.log("board", board)
    
        if(checkVerifiedBoardUser(board, user) || checkVerifiedBoardAdmin(board, user)) { 
          setBoard(board);
          
        } else {          
          const error = await board.json();
          throw new Error(error);
        }

      } catch (error) {
        setError(error)
      }
    setIsLoading(false)
    }
  getBoard()
  }, [boardNameActual, setBoard, setIsLoading])
  

  async function checkVerifiedBoardUser(board, user) {
    try {
        const verifiedBoardUser = board.users.find(boardUser => boardUser._id === user._id)
    
        if(verifiedBoardUser) {
            return true
        }

    } catch (error) {
    }
  }
    
  async function checkVerifiedBoardAdmin(board, user) {
    try {
      const verifiedBoardAdmin = board.admins.find(boardAdmin => boardAdmin._id === user._id)
      console.log("verifiedBoardAdmin", verifiedBoardAdmin)
      
      if(verifiedBoardAdmin) {
        console.log("verifiedBoardAdmin", verifiedBoardAdmin)
        return true
      }
    } catch (error) {
    }
  }

    if (error) {
      return (
        <div className="error-container">
          <img className="error-logo" src={logo} alt='cancan logo'/>
          <h1 className="error-h1-text">Sorry, you are not authorised to use this board</h1>    
          <div>
            <>
              <Link to={`/boards`} ><button>my boards</button></Link>
            </>
                      
          </div>
        </div>
      )
    } else if (isLoading) {
      return <div>Loading...</div>
    }
    
    else {
      return (
        <>
            <BoardDetail user={user} />
            <StepsPage user={user} />
        </>
      )

    }
}