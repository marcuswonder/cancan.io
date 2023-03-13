import '../AuthorBoardsList/AuthorBoardsList.css'
import detailsIcon from '../../public/assets/details-white.png'
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
                <h2 className="boards-list-h2">Collaborative Boards</h2>
                <p className="boards-list-custom-p">These are boards that you are a user of</p>
                    <div className="boards-list-board-body">
                        {userBoardGallery.map(board => (
                            <div className="boards-list-board-card-container" key={board._id}>
                                <div className="boards-list-board-card">
                                    <div className="boards-list-board-navigation">
                                        <div className="boards-list-board-navigation-details-container">
                                            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}><img className="boards-list-boards-details-icon" src={detailsIcon} alt='See a detailed view of your board'  title="See a detailed view of your board" /></Link>
                                        </div>
                                        <div className="boards-list-board-navigation-delete-container">
                                            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}></Link>
                                        </div>
                                    </div>
                                    <h2 className="boards-list-board-card-title">{board.title}</h2>
                                    <p className="boards-list-board-card-description">{board.description}</p>
                                    <p className="boards-list-board-card-description">Big Step Summary</p>
                                    <div className="boards-list-table-container">
                                        <table className="boards-list-table">
                                            <thead>
                                                <tr>
                                                    <th className="boards-list-th">Planned</th>
                                                    <th className="boards-list-th">In Progress</th>
                                                    <th className="boards-list-th">Complete</th>
                                                    <th className="boards-list-th">% Complete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="boards-list-td">{board.plannedBigStepsCount}</td>
                                                    <td className="boards-list-td">{board.inProgressBigStepsCount}</td>
                                                    <td className="boards-list-td">{board.completeBigStepsCount}</td>
                                                    <td className="boards-list-td">{board.bigStepCompletionRate}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                
                                </div>
                            </div>
                        ))}
                    </div>
            </div>

        :
        <></>
        }
        </>
    )
}