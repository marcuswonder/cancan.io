import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardsList() {
    const [boardGallery, setboardGallery] = useState([])

    useEffect(function() {
        async function getBoards() {
          const boards = await boardsAPI.getUserBoards()
          setboardGallery(boards)
        }
        getBoards()
        console.log("BoardsList line 14", boardGallery)
    }, [])


    return (
        <>
        {boardGallery.length ?
            <div>
                <h2>Boards List</h2>
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