import './BoardDetail.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import logo from '../../public/assets/idea.png'

export default function BoardDetail({ user, board, setBoard }) {
    const navigate = useNavigate()
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    const [isLoading, setIsLoading] = useState(true)  
    const [error, setError] = useState(null)  

    useEffect(function() {
        async function getBoard(user, board, setBoard) {
            while (!board.admins) {
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }

            try {
                function checkAuthorisation(user, board) {
                    const verifiedBoardUser = board.users.find(boardUser => boardUser._id === user._id)
                    const verifiedBoardAdmin = board.admins.find(boardAdmin => boardAdmin._id === user._id)
                    
                    if (verifiedBoardUser || verifiedBoardAdmin) {
                        return true
                    
                    } else {
                        return false
                    }
                }

                if (checkAuthorisation(user, board)) {
                    setBoard(board)
                    setIsLoading(false)

                } else {
                    const error = await board.json();
                    throw new Error(error);
                }
              
            } catch (error) {
              setError(error)
            }
        }
        getBoard(user, board, setBoard)
    }, [boardNameActual, user, board, setBoard, setIsLoading, setError])
    
    async function handleDeleteClick() {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)

        if (authorisedBoardAdmin) {
            await boardsAPI.deleteUserBoard(boardNameActual)
            navigate('/boards');
        } else {
            alert("Only the admin of a board can delete it.")
        }
    }
    
      


    if (error) {
        return (
        <div className="error-container">
            <img className="error-logo" src={logo} alt='cancan logo'/>
            <h1 className="error-h1-text">Sorry, you are not authorised to see this board</h1>    
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
                <div className="board-card-container">
                    <div className="board-card-header">
                        <div className="board-card-info">
                            <div className="board-card-header-title">
                                <h2 className="board-card-title-text">{board.title}</h2>
                            </div>
                            <div className="board-card-header-description">
                                <p className="board-card-description-text">{board.description}</p>
                            </div>
                        </div>
                        <div className="board-card-people">
                            <div>
                                {board.admins && board.admins.length > 0 && (
                                    <div className="board-card-admins" key={board._id}>
                                        <p className="custom-p">Board Admins</p>
                                    </div>
                                )}
                            </div>
                            <div className="board-card-admins-details">
                                {board.admins && board.admins.length > 0 ? (
                                        board.admins.map((user) => (
                                            <div className="board-card-user-container" key={user._id}>
                                                <p className="board-card-users-info">{user.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                            </div>  
                        
                            <div>
                                {board.users && board.users.length > 0 && (
                                    <div className="board-card-user" key={board._id}>
                                        <p className="custom-p">Board Users</p>
                                    </div>
                                )}
                            </div>
                            <div className="board-card-user-details">
                                {board.users && board.users.length > 0 ? (
                                    board.users.map((user) => (
                                        <div className="board-card-user-container" key={user._id}>
                                            <p className="board-card-users-info">{user.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="status-and-buttons">
                        {(board.admins?.find(admin => admin._id === user._id)) ? (
                            <>
                                <div className="update-button-div"><Link to={`/boards/${boardName}/update`}><button className="update-button">Update Board</button></Link></div>
                                <div className="board-card-status">
                                    <p className="board-card-status-text"></p>
                                </div>
                                <div className="button-div delete-button-div"><button onClick={handleDeleteClick} className="delete-button">Delete Board</button></div>
                            </>
                        ) : (
                            <div className="board-card-status">
                                <p className="board-card-status-text"></p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }
}