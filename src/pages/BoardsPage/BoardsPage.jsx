import { useState, useEffect } from 'react';
import * as boardsAPI from '../../utilities/boards-api'

export default function BoardsPage() {
    const [boardGallery, setboardGallery] = useState([])

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
                {boardGallery.map(board => (
                        <p key={board._id}>{board.title}</p>
                    ))}
            </div>

        :
        <p>Create some new boards!</p>
        }
        </>
    )
}