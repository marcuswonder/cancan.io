import '../../pages/App/App.css';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardDetail({user}) {
    const navigate = useNavigate()
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    const [board, setBoard] = useState({})

    useEffect(function() {
        async function getBoard() {
            const boards = await boardsAPI.getUserBoard(boardNameActual)
          setBoard(boards)
        }
        getBoard()
    }, [boardNameActual])

    
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
            <div className="board-card">
                <h2>{board.title}</h2>
                <p>Description: {board.description}</p>
                <p>Status: {board.status}</p>
                <div>
                    {board.author && <p>Author: {board.author.name}</p>}
                    
                    {board.users && board.users.length > 0 && (
                        <p>Users:</p>
                    )}
                    {board.users && board.users.length > 0 ? (
                        board.users.map((user) => (
                            <p key={user._id}>{user.name}</p>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                
                {user._id === board.author?._id ? (
                    <>
                        <Link to={`/boards/${boardName}/update`} ><button>Update Board</button></Link>
                        <button onClick={handleDeleteClick}>Delete Board</button>
                    </>
                ) : (
                <></>
                )}
                
            </div>
        </>
    )
}