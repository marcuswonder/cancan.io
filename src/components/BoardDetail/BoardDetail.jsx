import './BoardDetail.css';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardDetail({user, board}) {
    const navigate = useNavigate()
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

   

    
    async function handleDeleteClick() {
        if (user._id === board.author._id) {
            await boardsAPI.deleteUserBoard(boardNameActual)
            navigate('/boards');
        } else {
            alert("Only the author of a board can delete it.")
        }
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
                        <div className="board-card-author">
                            {board.author && <p className="board-card-author-text">Author: {board.author.name}</p>}
                        </div>
                    
                        <div className="board-card-users">
                            {board.users && board.users.length > 0 && (
                                <p>Users:</p>
                            )}
                            {board.users && board.users.length > 0 ? (
                                board.users.map((user) => (
                                    <p className="board-card-users-text" key={user._id}>{user.name}</p>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <div className="status-and-buttons">
                    {user._id === board.author?._id ? (
                        <>
                            <div className="update-button-div"><Link to={`/boards/${boardName}/update`}><button className="update-button">Update Board</button></Link></div>
                            <div className="board-card-status">
                                <p>Status: {board.status}</p>
                            </div>
                            <div className="button-div delete-button-div"><button onClick={handleDeleteClick} className="delete-button">Delete Board</button></div>
                        </>
                    ) : (
                        <div className="board-card-status">
                        <p>Status: {board.status}</p>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}