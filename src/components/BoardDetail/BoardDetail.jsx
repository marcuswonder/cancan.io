import './BoardDetail.css';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardDetail({user, board, setBoard}) {
    const navigate = useNavigate()
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    useEffect(function() {
        async function getBoard() {
            setBoard(board)
        }
        getBoard()
    }, [board, setBoard])

    
    async function handleDeleteClick() {
        // if (user._id === board.author._id) {
            await boardsAPI.deleteUserBoard(boardNameActual)
            navigate('/boards');
        // } else {
        //     alert("Only the author of a board can delete it.")
        // }
    }

    if (!board) {
        return <div>Loading...</div>
      }
    
      
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
                                            <p className="board-card-users-info" key={user._id}>{user.name}</p>
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
                                        <p className="board-card-users-info" key={user._id}>{user.name}</p>
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