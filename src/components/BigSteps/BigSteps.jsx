import '../../pages/App/App.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'

export default function BigSteps({ user, board, bigSteps }) {
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''


    async function handleDeleteClick(bigStep) {
        if (user._id === board.author._id || user._id === bigStep.author._id || user._id === bigStep.responsible._id) {
            await boardsAPI.deleteBigStep(board.title, bigStep.title)
        }
    }

    return (
        <>
            {bigSteps.length ?
            <div>
                <h2>Big Steps List for {boardNameActual}</h2>
                    <div>
                        {bigSteps.map(bigStep => (
                            <div className="big-step-card" key={bigStep._id}>
                                <Link to={`/boards/${boardName}/${bigStep.title.replace(/\s+/g, '-')}`} >
                                    Title: {bigStep.title}
                                </Link>
                                <p>Description: {bigStep.description}</p>
                                <p>Due: {bigStep.due}</p>
                                <p>Author: {bigStep.author.name}</p>
                                <p>Responsible: {bigStep.responsible.name}</p>
                                <Link to={`/boards/${boardName}/update`} >
                                    <button>Update Big Step</button>
                                </Link>
                                <button onClick={(evt) => handleDeleteClick(bigStep)}>Delete Big Step</button>
                            </div>
                        ))}
                    </div>
            </div>

        :
        <p>Add some Big Steps to your project!</p>
        }
            <Link to={`/boards/${boardName}/big-steps/add`}><button>Add Big Step</button></Link>
            
        </>
    )
}