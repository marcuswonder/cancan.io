import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardDetail({user}) {
    const navigate = useNavigate();
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    const [userBoard, setUserBoard] = useState({})

    useEffect(function() {
        async function getBoard() {
            const boards = await boardsAPI.getUserBoard(boardNameActual)
          setUserBoard(boards)
        }
        getBoard()
    }, [boardNameActual])

    
    async function handleDeleteClick() {
        if (user._id === userBoard.author._id) {
            await boardsAPI.deleteUserBoard(boardNameActual)
            navigate('/boards');
        } else {
            alert("Only the author of a board can delete it.")
        }
    }

    return (
        <>
            <h2>{userBoard.title}</h2>
            <div>
                <h2>Title: {userBoard.title}</h2>
                <p>MongoDB ID: {userBoard._id}</p>
                <p>Description: {userBoard.description}</p>
                <p>Status: {userBoard.status}</p>
                <div>
                    {userBoard.author && <p>Author: {userBoard.author.name}</p>}
                    
                    {userBoard.users && userBoard.users.length > 0 && (
                        <p>Users:</p>
                    )}
                    {userBoard.users && userBoard.users.length > 0 ? (
                        userBoard.users.map((user) => (
                            <p key={user._id}>{user.name}</p>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <p>{userBoard.createdAt}</p>
                
                {user._id === userBoard.author?._id ? (
                    <>
                        <Link to={`/boards/${boardName}/update`} >
                            <button>Update Board</button>
                        </Link>
                        <button onClick={handleDeleteClick}>Delete Board</button>
                    </>
                ) : (
                <></>
                )}

            </div>
        </>
    )
}