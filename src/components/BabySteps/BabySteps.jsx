import './BabySteps.css'
import deleteIcon from '../../public/assets/delete-icon-white.png'
import forwardIcon from '../../public/assets/fwd-white.png'
import backwardIcon from '../../public/assets/bwd-white.png'
import editIcon from '../../public/assets/edit.png'
import addIcon from '../../public/assets/add-white.png'
import { useParams, Link } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import { useState, useEffect } from 'react'

export default function BabySteps({ user, board, setBoard }) {
    const { boardName, bigStepName } = useParams()
    const bigStepNameActual = bigStepName ? bigStepName.replace(/-/g, ' ') : ''

    const [bigStep, setBigStep] = useState([])
    const [babySteps, setBabySteps] = useState([])

    const plannedSteps = babySteps.filter(babyStep => babyStep.status === 'Planned');
    const inProgressSteps = babySteps.filter(babyStep => babyStep.status === 'In Progress');
    const completedSteps = babySteps.filter(babyStep => babyStep.status === 'Complete');

    useEffect(function() {
        async function getBigStepsBabySteps() {
            await setBoard(board)
            console.log("board", board)

            const bigStep = board.bigSteps.find(bStep => bStep.title === bigStepNameActual)
            setBigStep(bigStep)
            console.log("bigStep", bigStep)

            const babySteps = bigStep.babySteps || []
            setBabySteps(babySteps)
            console.log("babySteps", babySteps)
        }
        getBigStepsBabySteps()
    }, [board, setBoard, setBabySteps])





    async function handleDeleteClick(babyStep) {
        if (user._id === board.author._id || user._id === babyStep.author._id || user._id === babyStep.responsible._id) {
            await boardsAPI.deleteBabyStep(board.title, babyStep.title)
            setBabySteps(babySteps.find((bStep) => bStep._id !== babyStep._id)
        )}
    }

    async function handlePlannedStatusChangeClick(babyStep) {
        if (user._id === board.author._id || user._id === babyStep.author._id || user._id === babyStep.responsible._id) {
            const updatedBabySteps = babySteps.map(step => {
                if (step._id === babyStep._id) {
                    return { ...step, status: "Planned" };
                }
                return step;
            });
            
            await boardsAPI.changeBabyStepStatusToPlanned(board._id, babyStep.bigStep, babyStep._id)
            setBabySteps(updatedBabySteps)
            
        } else {
            alert("Only the user of a baby step can update its status.")
        }
    }
    
    async function handleInProgressStatusChangeClick(babyStep) {
        if (user._id === board.author._id || user._id === babyStep.bigStep.author || user._id === babyStep.author._id || user._id === babyStep.responsible._id) {
            const updatedBabySteps = babySteps.map(step => {
                if (step._id === babyStep._id) {
                    return { ...step, status: "In Progress" };
                }
                return step;
            });
            
            await boardsAPI.changeBabyStepStatusToInProgress(board._id, babyStep.bigStep, babyStep._id)
            setBabySteps(updatedBabySteps)
            
        } else {
            alert("Only the user of a baby step can update its status.")
        }
    }
    
    async function handleCompleteStatusChangeClick(babyStep) {
        if (user._id === board.author._id || user._id === babyStep.author._id || user._id === babyStep.responsible._id) {
            const updatedBabySteps = babySteps.map(step => {
                if (step._id === babyStep._id) {
                    return { ...step, status: "Complete" };
                }
                return step;
            });

            await boardsAPI.changeBabyStepStatusToComplete(board._id, babyStep.bigStep, babyStep._id)
            setBabySteps(updatedBabySteps)

        } else {
            alert("Only the user of a baby step can update its status.")
        }
    }
   
    

    return (
        <>
            <div className="board-body">
                {babySteps.length ?
                <div className="baby-step-container">
                    <div className="baby-step-header">
                        <div className="baby-step-header-blank">
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
                    <div className="baby-step-section-header-container">
                        <div className="planned-section">
                            <h1 className="planned-section-header">planned</h1>
                            {plannedSteps.map(babyStep => (
                            <div key={babyStep.id}>
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
                                            <p className="baby-step-card-due">Due: {babyStep.due}</p>
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
                                    
                            </div>
                            ))}
                        </div>
                        <div className="in-progress-section">
                            <h1 className="in-progress-section-header">in progress</h1>
                            {inProgressSteps.map(babyStep => (
                            <div key={babyStep.id}>
                                <div className="baby-step-card">
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
                                            <p className="baby-step-card-due">Due: {babyStep.due}</p>
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
                            </div>
                            ))}
                        </div>
                        <div className="completed-section">
                            <h1 className="completed-section-header">complete</h1>
                            {completedSteps.map(babyStep => (
                            <div key={babyStep.id}>
                                <div className="baby-step-card">
                                    <div className="baby-step-card-top">
                                        <div className="baby-step-card-top-navigation">
                                        <div className="baby-step-card-backwards"><img className="backward-icon" onClick={(evt) => handleInProgressStatusChangeClick(babyStep)} src={backwardIcon} alt='go forwards' title="Move your baby step back to the in progress phase "/></div>
                                        </div>
                                        <div className="baby-step-card-top-about">
                                            <h2 className="baby-step-card-title">{babyStep.title}</h2>
                                            <h4 className="baby-step-card-description">{babyStep.description}</h4>
                                        </div>
                                        <div className="baby-step-card-responsible-and-due">
                                            <p className="baby-step-card-due">Due: {babyStep.due}</p>
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
                            </div>
                            ))}
                        </div>
                    </div>
                </div>

                :
                    <>
                        <div className="board-body">
                            <div className="baby-step-container">
                                <div className="baby-step-header">
                                    <div className="baby-step-header-blank"></div>
                                    <h1 className="baby-step-header-h1">baby Steps</h1>
                                    <div className="baby-step-header-add">
                                        <Link to={`/boards/${boardName}/baby-steps/add`}>
                                            <img className="add-icon" src={addIcon} alt='go backwards' title="Add a baby step to your project" />
                                        </Link>
                                    </div>
                                    </div>
                                    <div>
                                    <p className="baby-step-header-h1-no-baby-steps">There aren't any baby steps here.</p>
                                    <p className="baby-step-header-h1-no-baby-steps">Add some baby steps to your project!</p>
                                    <Link to={`/boards/${boardName}/${bigStepName}/baby-steps/add`}><button className="add-baby-step-button">Add Baby Step</button></Link>
                                </div>
                            </div>
                        </div>
                    </>
                }
                
            </div>
        </>
    )
}