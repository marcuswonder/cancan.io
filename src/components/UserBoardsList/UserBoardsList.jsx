import '../../pages/App/App.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'

export default function UserBoardsList() {
    const [userBoardGallery, setUserBoardGallery] = useState([])

    useEffect(function() {
        async function getUserBoards() {
          const boards = await boardsAPI.getUserBoards()
          setUserBoardGallery(boards)
        }
        getUserBoards()
    }, [])


    return (
        <>
        {userBoardGallery.length ?
            <div>
                <h2>User Boards List</h2>
                    <div>
                        {userBoardGallery.map(board => (
                            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}>
                            <p>{board.title}</p>
                            </Link>
                    ))}
                    </div>
            </div>

        :
        <p>Create some new boards!</p>
        }
        </>
    )
}