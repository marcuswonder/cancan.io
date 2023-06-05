import './AdminBoardsList.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'
import AdminBoardCard from '../AdminBoardCard/AdminBoardCard'

export default function AdminBoardsList({ user }) {
    const [adminBoardGallery, setAdminBoardGallery] = useState([])
    const navigate = useNavigate()

    useEffect(function() {
        async function getAdminBoards() {
          const adminBoardGallery = await boardsAPI.getAdminBoards()
          setAdminBoardGallery(adminBoardGallery)
        }
        getAdminBoards()
    }, [])

    async function handleDeleteClick(board) {
        // if (user._id === board.author) {
            await boardsAPI.deleteUserBoard(board.title)
            navigate('/boards')
            setAdminBoardGallery(prevState => prevState.filter(b => b._id !== board._id))
        // } else {
        //     alert("Only the author of a board can delete it.")
        // }
    }

    
    return (
    <>
        {adminBoardGallery.length ?
            <div>
                <h2 className="boards-list-h2">Your Boards</h2>
                <p className="boards-list-custom-p">These are boards that you are an administrator on</p>
                <div className="boards-list-board-body">
                    {adminBoardGallery.map(board => (
                    <AdminBoardCard board={board} onDeleteClick={handleDeleteClick} key={board.id} />
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
