import './BigSteps.css';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'

import * as boardsAPI from '../../utilities/boards-api'

import deleteIcon from '../../public/assets/delete-icon-white.png'
import forwardIcon from '../../public/assets/fwd-white.png'
import backwardIcon from '../../public/assets/bwd-white.png'
import detailsIcon from '../../public/assets/details-white.png'
import editIcon from '../../public/assets/edit.png'
import addIcon from '../../public/assets/add-white.png'


export default function BigSteps({ user, board, setBoard }) {
    const { boardName } = useParams()
    const [bigSteps, setBigSteps] = useState([])
    const navigate = useNavigate()

    const plannedSteps = bigSteps.filter(bigStep => bigStep.status === 'Planned')
    const inProgressSteps = bigSteps.filter(bigStep => bigStep.status === 'In Progress')
    const completedSteps = bigSteps.filter(bigStep => bigStep.status === 'Complete')

    useEffect(function() {
        async function getBigSteps() {
            await setBoard(board)
            const bigSteps = board.bigSteps || []
            setBigSteps(bigSteps)
        }
        getBigSteps()
    }, [board, setBoard, setBigSteps])


    async function handleDeleteClick(bigStep) {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser) {
            const updatedBoard = await boardsAPI.deleteBigStep(board._id, bigStep._id)
            setBoard(updatedBoard)
            navigate(`/boards/${boardName}`)
        } else {
            alert("Only the admin of a board or the user responsible for a big step can delete it.")
        }
    }

    async function handlePlannedStatusChangeClick(bigStep) {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser) {
            const updatedBigSteps = bigSteps.map(step => {
                if (step._id === bigStep._id) {
                    return { ...step, status: "Planned" };
                }
                return step;
            })

            await boardsAPI.changeBigStepStatusToPlanned(board._id, bigStep._id)
            setBigSteps(updatedBigSteps)

        } else {
            alert("Only the admin of a board or the user responsible for a big step can update its status.")
        }
    }

    async function handleInProgressStatusChangeClick(bigStep) {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser) {
            const updatedBigSteps = bigSteps.map(step => {
                if (step._id === bigStep._id) {
                    return { ...step, status: "In Progress" };
                }
                return step;
            });

            await boardsAPI.changeBigStepStatusToInProgress(board._id, bigStep._id)
            setBigSteps(updatedBigSteps)
            navigate(`/boards/${boardName}`)

        } else {
            alert("Only the admin of a board or the user responsible for a big step can update its status.")
        }
    }
    
    async function handleCompleteStatusChangeClick(bigStep) {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser) {
            const updatedBigSteps = bigSteps.map(step => {
                if (step._id === bigStep._id) {
                    return { ...step, status: "Complete" };
                }
                return step;
            });

            await boardsAPI.changeBigStepStatusToComplete(board._id, bigStep._id)
            setBigSteps(updatedBigSteps)

        } else {
            alert("Only the admin of a board or the user responsible for a big step can update its status.")
        }
    }
   

      return (
        <>
            <div className="board-body">
                {bigSteps.length ?
                <div className="big-step-container">
                    <div className="big-step-header">
                        <div className="big-step-header-back">
                            <Link to={`/boards`}>
                                <img className="back-icon" src={backwardIcon} alt='back to your Boards' title="Back to your boards" />
                            </Link>
                        </div>
                        <h1 className="big-step-header-h1">Big Steps</h1>
                        <div className="big-step-header-add">
                            <Link to={`/boards/${boardName}/big-steps/add`}>
                                <img className="add-icon" src={addIcon} alt='Add a big step to your project' title="Add a big step to your project" />
                            </Link>
                        </div>
                    </div>
                    <div className="big-step-section-header-container">
                        <div className="planned-section">
                            <h1 className="planned-section-header">planned</h1>
                            {plannedSteps.map(bigStep => (
                                <div className="big-step-card" key={bigStep._id}>
                                    <div className="big-step-card-top">
                                        <div className="big-step-card-top-navigation">
                                            <div className="big-step-card-backwards"></div>
                                            <div className="big-step-card-forward"><img className="forward-icon" src={forwardIcon} onClick={(evt) => { evt.stopPropagation(); handleInProgressStatusChangeClick(bigStep)}} alt='Move your big step forward to the in progress phase' title="Move your big step forward to the in progress phase" /></div>
                                        </div>
                                        <div className="big-step-card-top-about">
                                            <h2 className="big-step-card-title">{bigStep.title}</h2>
                                            <h4 className="big-step-card-description">{bigStep.description}</h4>
                                        </div>
                                        <div className="big-step-card-responsible-and-due">
                                            <p className="big-step-card-due">Due: {new Date(bigStep.due).toLocaleDateString('en-GB')}</p>
                                            <p className="big-step-card-responsible">Responsible: {bigStep.responsible.name}</p>
                                        </div>
                                    </div>
                                    <div className="big-step-card-middle">
                                    </div>
                                    <div className="big-step-card-bottom-navigation">
                                        <div className="big-step-card-update">
                                            <Link to={`/boards/${boardName}/${bigStep.title.replace(/\s+/g, '-')}/update`} >
                                                <img className="update-icon" src={editIcon} alt='Update the details on your big step' title="Update the details on your big step" />
                                            </Link>
                                        </div>
                                        {/* <div className="big-step-card-details">
                                            <Link to={`/boards/${boardName}/${bigStep.title.replace(/\s+/g, '-')}`} >
                                                <img className="details-icon" src={detailsIcon} alt='See a detailed view of your big step'  title="See a detailed view of your big step" />
                                            </Link>
                                        </div> */}
                                        <div className="big-step-card-delete">
                                            <img className="delete-icon" src={deleteIcon} onClick={(evt) => handleDeleteClick(bigStep)} alt='Delete your big step' title="Delete your big step from this project" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="in-progress-section">
                            <h1 className="in-progress-section-header">in progress</h1>
                            {inProgressSteps.map(bigStep => (
                                <div className="big-step-card" key={bigStep._id}>
                                    <div className="big-step-card-top">
                                        <div className="big-step-card-top-navigation">
                                            <div className="big-step-card-backwards"><img className="backward-icon" src={backwardIcon} onClick={(evt) => handlePlannedStatusChangeClick(bigStep)} alt='go forwards' title="Move your big step back to the planned phase "/></div>
                                            <div className="big-step-card-forward"><img className="forward-icon" src={forwardIcon} onClick={(evt) => handleCompleteStatusChangeClick(bigStep)} alt='Move your big step forward to the completed phase' title="Move your big step forward to the completed phase" /></div>
                                        </div>
                                        <div className="big-step-card-top-about">
                                            <h2 className="big-step-card-title">{bigStep.title}</h2>
                                            <h4 className="big-step-card-description">{bigStep.description}</h4>
                                        </div>
                                        <div className="big-step-card-responsible-and-due">
                                            <p className="big-step-card-due">Due: {new Date(bigStep.due).toLocaleDateString('en-GB')}</p>
                                            <p className="big-step-card-responsible">Responsible: {bigStep.responsible.name}</p>
                                        </div>
                                    </div>
                                    <div className="big-step-card-middle">
                                    </div>
                                    <div className="big-step-card-bottom-navigation">
                                        <div className="big-step-card-update">
                                            <Link to={`/boards/${boardName}/${bigStep.title.replace(/\s+/g, '-')}/update`} >
                                                <img className="update-icon" src={editIcon} alt='Update the details on your big step' title="Update the details on your big step" />
                                            </Link>
                                        </div>
                                        {/* <div className="big-step-card-details">
                                            <Link to={`/boards/${boardName}/${bigStep.title.replace(/\s+/g, '-')}`} >
                                                <img className="details-icon" src={detailsIcon} alt='See a detailed view of your big step'  title="See a detailed view of your big step" />
                                            </Link>
                                        </div> */}
                                        <div className="big-step-card-delete">
                                            <img className="delete-icon" src={deleteIcon} onClick={(evt) => handleDeleteClick(bigStep)} alt='Delete your big step' title="Delete your big step from this project" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="completed-section">
                            <h1 className="completed-section-header">complete</h1>
                            {completedSteps.map(bigStep => (
                                <div className="big-step-card" key={bigStep._id}>
                                    <div className="big-step-card-top">
                                        <div className="big-step-card-top-navigation">
                                        <div className="big-step-card-backwards"><img className="backward-icon" onClick={(evt) => handleInProgressStatusChangeClick(bigStep)} src={backwardIcon} alt='go forwards' title="Move your big step back to the in progress phase "/></div>
                                        </div>
                                        <div className="big-step-card-top-about">
                                            <h2 className="big-step-card-title">{bigStep.title}</h2>
                                            <h4 className="big-step-card-description">{bigStep.description}</h4>
                                        </div>
                                        <div className="big-step-card-responsible-and-due">
                                            <p className="big-step-card-due">Due: {new Date(bigStep.due).toLocaleDateString('en-GB')}</p>
                                            <p className="big-step-card-responsible">Responsible: {bigStep.responsible.name}</p>
                                        </div>
                                    </div>
                                    <div className="big-step-card-middle">
                                    </div>
                                    <div className="big-step-card-bottom-navigation">
                                        <div className="big-step-card-update">
                                            <Link to={`/boards/${boardName}/${bigStep.title.replace(/\s+/g, '-')}/update`} >
                                                <img className="update-icon" src={editIcon} alt='Update the details on your big step' title="Update the details on your big step" />
                                            </Link>
                                        </div>
                                        {/* <div className="big-step-card-details">
                                            <Link to={`/boards/${boardName}/${bigStep.title.replace(/\s+/g, '-')}`} >
                                                <img className="details-icon" src={detailsIcon} alt='See a detailed view of your big step'  title="See a detailed view of your big step" />
                                            </Link>
                                        </div> */}
                                        <div className="big-step-card-delete">
                                            <img className="delete-icon" src={deleteIcon} onClick={(evt) => handleDeleteClick(bigStep)} alt='Delete your big step' title="Delete your big step from this project" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                :
                    <>
                        <div className="board-body">
                            <div className="big-step-container">
                                <div className="big-step-header">
                                    <div className="big-step-header-back"></div>
                                    <h1 className="big-step-header-h1">Big Steps</h1>
                                    <div className="big-step-header-add">
                                        <Link to={`/boards/${boardName}/big-steps/add`}>
                                            <img className="add-icon" src={addIcon} alt='go backwards' title="Add a big step to your project" />
                                        </Link>
                                    </div>
                                    </div>
                                    <div>
                                    <p className="big-step-header-h1-no-big-steps">There aren't any big steps here.</p>
                                    <p className="big-step-header-h1-no-big-steps">Add some big steps to your project!</p>
                                    <Link to={`/boards/${boardName}/big-steps/add`}><button className="add-big-step-button">Add Big Step</button></Link>
                                </div>
                            </div>
                        </div>
                    </>
                }
                
            </div>
        </>
    )
}