import './UserBoardsList.css'
import detailsIcon from '../../public/assets/details-white.png'
import deleteIcon from '../../public/assets/delete-icon-white.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'
import BoardCard from '../BoardCard/BoardCard'

export default function UserBoardsList({ user }) {
    const [userBoardGallery, setUserBoardGallery] = useState([])
    const [hoveredTitle, setHoveredTitle] = useState(null);
    const [hoveredDescription, setHoveredDescription] = useState(null);
    

    useEffect(function() {
        async function getUserBoards() {
          const userBoardGallery = await boardsAPI.getUserBoards()
          setUserBoardGallery(userBoardGallery)
        }
        getUserBoards()
    }, [])

    
    return (
    <>
        {userBoardGallery.length ?
            <div>
                <h2 className="boards-list-h2">Collaborative Boards</h2>
                <p className="boards-list-custom-p">These are boards that you are a user on</p>
                <div className="boards-list-board-body">
                    {userBoardGallery.map(board => (
                    <BoardCard key={board._id} board={board} />
                    ))}
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        :
        <>
        </>
        }

    </>
    );
}
