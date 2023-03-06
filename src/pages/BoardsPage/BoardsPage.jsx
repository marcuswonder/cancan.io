import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'
import { Link, useNavigate } from 'react-router-dom';

export default function BoardsPage() {
    const [boardGallery, setboardGallery] = useState([])
    const navigate = useNavigate()

    useEffect(function() {
        async function getBoards() {
          const boards = await boardsAPI.getUserBoards()
          setboardGallery(boards)
        }
        getBoards()
        console.log("BoardsPage line 13", boardGallery)
    }, [])


    return (
        <>
        {boardGallery.length ?
            <div>
                <h1>Boards Page</h1>
                    <div>
                        {boardGallery.map(board => (
                            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`}>
                                <p key={board._id}>{board.title}</p>
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