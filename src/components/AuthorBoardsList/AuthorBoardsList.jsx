import './AuthorBoardsList.css'
import detailsIcon from '../../public/assets/details-white.png'
import deleteIcon from '../../public/assets/delete-icon-white.png'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as boardsAPI from '../../utilities/boards-api'

export default function AuthorBoardsList({ user }) {
    const [userBoardGallery, setUserBoardGallery] = useState([])
    

    useEffect(function() {
        async function getAuthorBoards() {
          const boards = await boardsAPI.getAuthorBoards()
          setUserBoardGallery(boards)
        }
        getAuthorBoards()
    }, [])

    async function handleDeleteClick(board) {
        if (user._id === board.author) {
            await boardsAPI.deleteUserBoard(board.title)
            setUserBoardGallery(prevState => prevState.filter(b => b._id !== board._id))
        } else {
            alert("Only the author of a board can delete it.")
        }
    }


    return (
        <>
        {userBoardGallery.length ?
            <div>
                <h2 className="boards-list-h2">Authored Boards</h2>
                <p className="boards-list-custom-p">These are boards that you have created</p>
                    <div className="boards-list-board-body">
                        {userBoardGallery.map(board => (
                            <div className="boards-list-board-card-container" key={board._id}>
                                <div className="boards-list-board-card">
                                    <div className="boards-list-board-navigation">
                                        <div className="boards-list-board-navigation-details-container">
                                            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}><img className="boards-list-boards-details-icon" src={detailsIcon} alt='See a detailed view of your board'  title="See a detailed view of your board" /></Link>
                                        </div>
                                        <div className="boards-list-board-navigation-delete-container">
                                            <img className="boards-list-boards-delete-icon" key={board._id} onClick={() => handleDeleteClick(board)} src={deleteIcon} alt='Delete this board'  title="Delete this board" />
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
                    <p className="boards-list-p">Create another board!</p>
                    <div><Link to="/boards/new"><button className="boards-list-button">new board</button></Link></div>
            </div>

        :
        <>
            <h1 className="boards-list-h1">You have not created any boards yet</h1>
            <p>Create some now!</p>
            <div><Link to="/boards/new"><button className="boards-list-button">new board</button></Link></div>
        </>
        }
        </>
    )
}