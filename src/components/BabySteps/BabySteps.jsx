import './BabySteps.css'
import deleteIcon from '../../public/assets/delete-icon-white.png'
import forwardIcon from '../../public/assets/fwd-white.png'
import backwardIcon from '../../public/assets/bwd-white.png'
import editIcon from '../../public/assets/edit.png'
import addIcon from '../../public/assets/add-white.png'
import { useParams, Link, useNavigate } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import { useState, useEffect } from 'react'

export default function BabySteps({ user, board, setBoard }) {
    const { boardName, bigStepName } = useParams()
    const bigStepNameActual = bigStepName ? bigStepName.replace(/-/g, ' ') : ''
    const navigate = useNavigate()

    const [bigStep, setBigStep] = useState([])
    const [babySteps, setBabySteps] = useState([])

    const plannedSteps = babySteps.filter(babyStep => babyStep.status === 'Planned');
    const inProgressSteps = babySteps.filter(babyStep => babyStep.status === 'In Progress');
    const completedSteps = babySteps.filter(babyStep => babyStep.status === 'Complete');

    useEffect(function() {
        async function getBigStepsBabySteps() {
            await setBoard(board)
    
            if (board && board.bigSteps) {
                const bigStep = board.bigSteps.find(bStep => bStep.title === bigStepNameActual)
                setBigStep(bigStep)
    
                const babySteps = bigStep.babySteps || []
                setBabySteps(babySteps)
            }
        }
        getBigStepsBabySteps()
    }, [board, setBoard, setBabySteps, bigStepNameActual])


    async function handleDeleteClick(babyStep) {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id
        const authorisedBabyStepUser = babyStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser || authorisedBabyStepUser) {
            const updatedBoard = await boardsAPI.deleteBabyStep(board._id, bigStep._id, babyStep._id)
            setBoard(updatedBoard)
            navigate(`/boards/${boardName}/${bigStepName}`)
        } else {
            alert("Only the admin of a board or the user responsible for a big step can delete it.")
        }
    }

    async function handlePlannedStatusChangeClick(babyStep) {  
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id
        const authorisedBabyStepUser = babyStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser || authorisedBabyStepUser) {
            const updatedBabySteps = babySteps.map(step => {
                if (step._id === babyStep._id) {
                    return { ...step, status: "Planned" };
                }
                return step;
            });
            
            await boardsAPI.changeBabyStepStatusToPlanned(board._id, babyStep.bigStep, babyStep._id)
            setBabySteps(updatedBabySteps)
            
        } else {
            alert("Only the admin of a board or the user responsible for the big step or the baby step can update its status.")
        }
    }
    
    async function handleInProgressStatusChangeClick(babyStep) {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id
        const authorisedBabyStepUser = babyStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser || authorisedBabyStepUser) {
            const updatedBabySteps = babySteps.map(step => {
                if (step._id === babyStep._id) {
                    return { ...step, status: "In Progress" };
                }
                return step;
            });
            
            await boardsAPI.changeBabyStepStatusToInProgress(board._id, babyStep.bigStep, babyStep._id)
            setBabySteps(updatedBabySteps)
            
        } else {
            alert("Only the admin of a board or the user responsible for the big step or the baby step can update its status.")
        }
    }
    
    async function handleCompleteStatusChangeClick(babyStep) {
        const authorisedBoardAdmin = board.admins.find(admin => admin._id === user._id)
        const authorisedBigStepUser = bigStep.responsible._id === user._id
        const authorisedBabyStepUser = babyStep.responsible._id === user._id

        if (authorisedBoardAdmin || authorisedBigStepUser || authorisedBabyStepUser) {
            const updatedBabySteps = babySteps.map(step => {
                if (step._id === babyStep._id) {
                    return { ...step, status: "Complete" };
                }
                return step;
            });

            await boardsAPI.changeBabyStepStatusToComplete(board._id, babyStep.bigStep, babyStep._id)
            setBabySteps(updatedBabySteps)

        } else {
            alert("Only the admin of a board or the user responsible for the big step or the baby step can update its status.")
        }
    }
   
    

    return (
        <>

            <div className="board-body">
                {babySteps.length ?

                    <div className="big-step-on-baby-step-container">
                        <div className="big-step-on-baby-step-header">
                            <h1 className="big-step-on-baby-step-header-h1">{bigStepNameActual}</h1>
                        </div>
                        <div className="baby-step-container">
                            
                            <div className="baby-step-header">
                                <div className="baby-step-header-back">
                                    <Link to={`/boards/${boardName}`}>
                                        <img className="back-icon" src={backwardIcon} alt='back to your board' title="Back to the board" />
                                    </Link>
                                </div>
                                <h1 className="baby-step-header-h1">Baby Steps</h1>
                                <div className="baby-step-header-add">
                                    <Link to={`/boards/${boardName}/${bigStepName}/baby-steps/add`}>
                                        <img className="add-icon" src={addIcon} alt='go backwards' title="Add a baby step to your project" />
                                    </Link>
                                </div>
                            </div>
                            <div className="baby-step-section-header-container">
                                <div className="planned-section">
                                    <h1 className="planned-section-header">planned</h1>
                                    {plannedSteps.map(babyStep => (
                                        <div className="baby-step-card" key={babyStep._id}>
                                            <div className="baby-step-card-top">
                                                <div className="baby-step-card-top-navigation">
                                                    <div className="baby-step-card-backwards"></div>
                                                    <div className="baby-step-card-forward"><img className="forward-icon" src={forwardIcon} onClick={(evt) => handleInProgressStatusChangeClick(babyStep)} alt='Move your baby step forward to the in progress phase' title="Move your baby step forward to the in progress phase" /></div>
                                                </div>
                                                <div className="baby-step-card-top-about">
                                                    <h2 className="baby-step-card-title">{babyStep.title}</h2>
                                                    <h4 className="baby-step-card-description">{babyStep.description}</h4>
                                                </div>
                                                <div className="baby-step-card-responsible-and-due">
                                                    <p className="baby-step-card-due">Due: {new Date(babyStep.due).toLocaleDateString('en-GB')}</p>
                                                    <p className="baby-step-card-responsible">Responsible: {babyStep.responsible.name}</p>
                                                </div>
                                            </div>
                                            <div className="baby-step-card-middle">
                                            </div>
                                            <div className="baby-step-card-bottom-navigation">
                                                <div className="baby-step-card-details">
                                                    <Link to={`/boards/${boardName}/${bigStepName}/${babyStep.title.replace(/\s+/g, '-')}/update`} >
                                                        <img className="update-icon" src={editIcon} alt='Update the details on your baby step' title="Update the details on your baby step" />
                                                    </Link>
                                                </div>
                                                <div className="baby-step-card-delete">
                                                    <img className="delete-icon" src={deleteIcon} onClick={(evt) => handleDeleteClick(babyStep)} alt='Delete your baby step' title="Delete your baby step from this project" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="in-progress-section">
                                    <h1 className="in-progress-section-header">in progress</h1>
                                    {inProgressSteps.map(babyStep => (
                                        <div className="baby-step-card" key={babyStep._id}>
                                            <div className="baby-step-card-top">
                                                <div className="baby-step-card-top-navigation">
                                                    <div className="baby-step-card-backwards"><img className="backward-icon" src={backwardIcon} onClick={(evt) => handlePlannedStatusChangeClick(babyStep)} alt='go forwards' title="Move your baby step back to the planned phase "/></div>
                                                    <div className="baby-step-card-forward"><img className="forward-icon" src={forwardIcon} onClick={(evt) => handleCompleteStatusChangeClick(babyStep)} alt='Move your baby step forward to the completed phase' title="Move your baby step forward to the completed phase" /></div>
                                                </div>
                                                <div className="baby-step-card-top-about">
                                                    <h2 className="baby-step-card-title">{babyStep.title}</h2>
                                                    <h4 className="baby-step-card-description">{babyStep.description}</h4>
                                                </div>
                                                <div className="baby-step-card-responsible-and-due">
                                                    <p className="baby-step-card-due">Due: {new Date(babyStep.due).toLocaleDateString('en-GB')}</p>
                                                    <p className="baby-step-card-responsible">Responsible: {babyStep.responsible.name}</p>
                                                </div>
                                            </div>
                                            <div className="baby-step-card-middle">
                                            </div>
                                            <div className="baby-step-card-bottom-navigation">
                                                <div className="baby-step-card-details">
                                                <Link to={`/boards/${boardName}/baby-steps/${babyStep.title.replace(/\s+/g, '-')}/update`} >
                                                        <img className="update-icon" src={editIcon} alt='Update the details on your baby step' title="Update the details on your baby step" />
                                                    </Link>
                                                </div>
                                                <div className="baby-step-card-delete">
                                                    <img className="delete-icon" src={deleteIcon} onClick={(evt) => handleDeleteClick(babyStep)} alt='Delete your baby step' title="Delete your baby step from this project" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="completed-section">
                                    <h1 className="completed-section-header">complete</h1>
                                    {completedSteps.map(babyStep => (
                                        <div className="baby-step-card" key={babyStep._id}>
                                            <div className="baby-step-card-top">
                                                <div className="baby-step-card-top-navigation">
                                                <div className="baby-step-card-backwards"><img className="backward-icon" onClick={(evt) => handleInProgressStatusChangeClick(babyStep)} src={backwardIcon} alt='go backwards' title="Move your baby step back to the in progress phase "/></div>
                                                </div>
                                                <div className="baby-step-card-top-about">
                                                    <h2 className="baby-step-card-title">{babyStep.title}</h2>
                                                    <h4 className="baby-step-card-description">{babyStep.description}</h4>
                                                </div>
                                                <div className="baby-step-card-responsible-and-due">
                                                    <p className="baby-step-card-due">Due: {new Date(babyStep.due).toLocaleDateString('en-GB')}</p>
                                                    <p className="baby-step-card-responsible">Responsible: {babyStep.responsible.name}</p>
                                                </div>
                                            </div>
                                            <div className="baby-step-card-middle">
                                            </div>
                                            <div className="baby-step-card-bottom-navigation">
                                                <div className="baby-step-card-details">
                                                <Link to={`/boards/${boardName}/baby-steps/${babyStep.title.replace(/\s+/g, '-')}/update`} >
                                                        <img className="update-icon" src={editIcon} alt='Update the details on your baby step' title="Update the details on your baby step" />
                                                    </Link>
                                                </div>
                                                <div className="baby-step-card-delete">
                                                    <img className="delete-icon" src={deleteIcon} onClick={(evt) => handleDeleteClick(babyStep)} alt='Delete your baby step' title="Delete your baby step from this project" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                

                :
                    <>
                        <div className="board-body">
                            <div className="big-step-on-baby-step-container">
                                <div className="big-step-on-baby-step-header">
                                    <h1 className="big-step-on-baby-step-header-h1">{bigStepNameActual}</h1>
                                </div>
                                <div className="baby-step-container">
                                    <div className="baby-step-header">   
                                        <div className="baby-step-header-back">
                                            <Link to={`/boards/${boardName}`}>
                                                <img className="add-icon" src={backwardIcon} alt='back to your board' title="Back to the board" />
                                            </Link>
                                        </div>
                                        <h1 className="baby-step-header-h1">Baby Steps</h1>
                                        <div className="baby-step-header-add">
                                            <Link to={`/boards/${boardName}/${bigStepName}/baby-steps/add`}>
                                                <img className="add-icon" src={addIcon} alt='go backwards' title="Add a baby step to your project" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="baby-step-header-h1-no-baby-steps">There aren't any baby steps yet.</p>
                                        <p className="baby-step-header-h1-no-baby-steps">Add some to your project!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                
            </div>
            <Link to={`/boards/${boardName}/${bigStepName}/baby-steps/add`}><button className="add-baby-step-button">Add Baby Step</button></Link>
        </>
    )
}