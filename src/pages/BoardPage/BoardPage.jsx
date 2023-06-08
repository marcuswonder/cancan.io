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
  const [ board, setBoard ] = useState({})
  const [ bigStep, setBigStep ] = useState({})
  const [ bigSteps, setBigSteps ] = useState({})
  const [ babySteps, setBabySteps ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)  
  const [ error, setError ] = useState(null)  

  useEffect(function() {
    async function getBoard(user) {
      try {
        const board = await boardsAPI.getBoard(boardNameActual)  

        while (!board) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
        const verifiedBoardUser = board.users.find(boardUser => boardUser._id === user._id)
        const verifiedBoardAdmin = board.admins.find(boardAdmin => boardAdmin._id === user._id)
        
        if (verifiedBoardUser || verifiedBoardAdmin) {
          setBoard(board)

          const bigSteps = board.bigSteps
          setBigSteps(bigSteps)
          console.log("bigSteps", bigSteps)
          
          setIsLoading(false)
        }
        
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }
    getBoard(user)
  }, [boardNameActual, user, setBoard, setBigStep, setBigSteps, setIsLoading, setError])

 
  if (isLoading) {
  return <div>Loading...</div>

  } else if (error) {
    return (
        <div className="error-container">
            <img className="error-logo" src={logo} alt='cancan logo'/>
            <h1 className="error-h1-text">Sorry, this board either doesn't exist or you're not authorised to use it</h1>    
            <div>
            <>
                <Link to={`/boards`} ><button>my boards</button></Link>
            </>
                        
            </div>
        </div>
    )

  } else {
      return (
      <>
          <BoardDetail user={user} board={board} />
          <StepsPage user={user} board={board} setBoard={setBoard} bigStep={bigStep} setBigStep={setBigStep} bigSteps={bigSteps} setBigSteps={setBigSteps} />
      </>
    )
  }
}
