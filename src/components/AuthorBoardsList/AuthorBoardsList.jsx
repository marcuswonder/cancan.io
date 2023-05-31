import './AuthorBoardsList.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'
import BoardCard from '../BoardCard/BoardCard'

export default function AuthorBoardsList({ user }) {
    const [userBoardGallery, setUserBoardGallery] = useState([])
    const navigate = useNavigate()

    useEffect(function() {
        async function getAuthorBoards() {
          const userBoardGallery = await boardsAPI.getAuthorBoards()
          setUserBoardGallery(userBoardGallery)
        }
        getAuthorBoards()
    }, [])

    async function handleDeleteClick(board) {
        // if (user._id === board.author) {
            await boardsAPI.deleteUserBoard(board.title)
            navigate('/boards')
            setUserBoardGallery(prevState => prevState.filter(b => b._id !== board._id))
        // } else {
        //     alert("Only the author of a board can delete it.")
        // }
    }

    
    return (
    <>
        {userBoardGallery.length ?
            <div>
                <h2 className="boards-list-h2">Your Boards</h2>
                <p className="boards-list-custom-p">These are boards that you are an administrator on</p>
                <div className="boards-list-board-body">
                    {userBoardGallery.map(board => (
                    <BoardCard board={board} onDeleteClick={handleDeleteClick} key={board.id} />
                    ))}
                </div>
                <p className="boards-list-p">Create another board!</p>
                <div><Link to="/boards/new"><button className="boards-list-button">create board</button></Link></div>
            </div>
        :
        <>
            <h1 className="boards-list-h1">You have not created any boards yet</h1>
            <p>Create some now!</p>
            <div><Link to="/boards/new"><button className="boards-list-button">new board</button></Link></div>
        </>
        }

    </>
    );
}
