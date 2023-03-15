import './AuthorBoardsList.css'
import detailsIcon from '../../public/assets/details-white.png'
import deleteIcon from '../../public/assets/delete-icon-white.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'
import BoardCard from '../BoardCard/BoardCard'

export default function AuthorBoardsList({ user }) {
    const [userBoardGallery, setUserBoardGallery] = useState([])
    const [hoveredTitle, setHoveredTitle] = useState(null);
    const [hoveredDescription, setHoveredDescription] = useState(null);
    

    useEffect(function() {
        async function getAuthorBoards() {
          const userBoardGallery = await boardsAPI.getAuthorBoards()
          setUserBoardGallery(userBoardGallery)
        }
        getAuthorBoards()
    }, [])

    async function handleDeleteClick(board) {
        if (user._id === board.author) {
            await boardsAPI.deleteUserBoard(board.title)
            setUserBoardGallery(prevState => prevState.filter(b => b._id !== board._id))
        } else {
            alert("Only the author of a board can delete it.")
        }
    }

    
    return (
    <>
        {userBoardGallery.length ?
            <div>
                <h2 className="boards-list-h2">Your Boards</h2>
                <p className="boards-list-custom-p">These are boards that you are an administrator on</p>
                <div className="boards-list-board-body">
                    {userBoardGallery.map(board => (
                    <BoardCard key={board._id} board={board} onDeleteClick={handleDeleteClick} />
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
