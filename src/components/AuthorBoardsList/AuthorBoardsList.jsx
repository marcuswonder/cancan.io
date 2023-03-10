import './AuthorBoardsList.css'
import detailsIcon from '../../public/assets/details-white.png'
import deleteIcon from '../../public/assets/delete-icon-white.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'

export default function AuthorBoardsList() {
    const [userBoardGallery, setUserBoardGallery] = useState([])
    

    useEffect(function() {
        async function getAuthorBoards() {
          const boards = await boardsAPI.getAuthorBoards()
          setUserBoardGallery(boards)
          console.log(boards)
        }
        getAuthorBoards()
    }, [])


    return (
        <>
        {userBoardGallery.length ?
            <div>
                <h2>Author Boards List</h2>
                    <div className="boards-list-board-body">
                        {userBoardGallery.map(board => (
                            <div className="boards-list-board-card-container">
                                <div className="boards-list-board-card">
                                    <div boards-list-board-navigation>
                                        <div className="boards-list-board-navigation-details-container">
                                            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}><img className="boards-list-boards-details-icon" src={detailsIcon} alt='See a detailed view of your board'  title="See a detailed view of your board" /></Link>
                                        </div>
                                        <div className="boards-list-board-navigation-delete-container">
                                            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}><img className="boards-list-boards-delete-icon" src={deleteIcon} alt='Delete this board'  title="Delete this board" /></Link>
                                        </div>
                                        <p className="boards-list-board-card-title">{board.title}</p>
                                        <p className="boards-list-board-card-description">{board.description}</p>
                                        <p className="custom-p">Big Step Summary</p>
                                        <div className="table">
                                        <table>
                                            <thead>
                                                <td>Planned</td>
                                                <td>In Progress</td>
                                                <td>Complete</td>
                                                <td>% Complete</td>
                                            </thead>
                                            <tbody>
                                                <td>{board.plannedBigStepsCount}</td>
                                                <td>{board.inProgressBigStepsCount}</td>
                                                <td>{board.completeBigStepsCount}</td>
                                                <td>{board.bigStepCompletionRate}</td>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                </div>
                            </div>
                        ))}
                    </div>
            </div>

        :
        <p>Create some new boards!</p>
        }
        </>
    )
}