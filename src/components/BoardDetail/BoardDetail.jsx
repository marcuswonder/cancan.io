import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardDetail() {
    const navigate = useNavigate();
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    const [userBoard, setUserBoard] = useState([])

    useEffect(function() {
        async function getBoard() {
          const boards = await boardsAPI.getUserBoard(boardNameActual)
          setUserBoard(boards)
        }
        getBoard()
    }, [boardNameActual])

    async function handleDeleteClick() {
        await boardsAPI.deleteUserBoard(boardNameActual)
        navigate('/boards');
    }

    return (
        <>
            <h2>Board Detail</h2>
            <div>
                <h2>Title: {userBoard.title}</h2>
                <p>MongoDB ID: {userBoard._id}</p>
                <p>Description: {userBoard.description}</p>
                <p>Status: {userBoard.status}</p>
                <p>Author: {userBoard.author}</p>
                {/* {userBoard.users.map((user) => (
                    <p key={user._id}>{user.name}</p>
                ))} */}
                <p>{userBoard.createdAt}</p>
                
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </>
    )
}