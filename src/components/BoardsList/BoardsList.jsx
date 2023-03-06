import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardsList() {
    const [userBoardGallery, setUserBoardGallery] = useState([])

    useEffect(function() {
        async function getBoards() {
          const boards = await boardsAPI.getUserBoards()
          setUserBoardGallery(boards)
        }
        getBoards()
    }, [])


    return (
        <>
        {userBoardGallery.length ?
            <div>
                <h2>Boards List</h2>
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