import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'

export default function AddBigStepPage({ user }) {
    const navigate = useNavigate()
    const { bigStepName, boardName } = useParams()
    const bigStepNameActual = bigStepName ? bigStepName.replace(/-/g, ' ') : ''
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    
    const [ bigSteps, setBigSteps ] = useState([])
    const [ bigStepUpdate, setBigStepUpdate ] = useState({ title: '', description: '', due: new Date(), responsible: '' })
    const [ usersGallery, setUsersGallery ] = useState([])
    const [ responsibleUser, setResponsibleUser ] = useState('')
    const [ board, setBoard ] = useState({})
    const [ bigStep, setBigStep ] = useState({})

    useEffect(function() {
        async function getBoard() {
            const board = await boardsAPI.getUserBoard(boardNameActual)
            setBoard(board)
        }
          getBoard()
    }, [boardNameActual])

    useEffect(function() {
        async function getBigStep() {
            const bigStep = await boardsAPI.getBigStep(boardNameActual, bigStepNameActual)
            setBigStep(bigStep)
        }
        getBigStep()
    }, [boardNameActual, bigStepNameActual])


    async function updateBigStep(bigStepUpdate) {
        bigStepUpdate.author = user._id
        bigStepUpdate.board = board._id
        bigStepUpdate._id = bigStep._id
        bigStepUpdate.responsible = responsibleUser
        const updatedBigStep = await boardsAPI.updateBigStep(bigStepUpdate);
        setBigSteps([...bigSteps, updatedBigStep]);
    }
    
    async function handleUpdateBigStep(evt) {
        evt.preventDefault();
        const bigStepData = { ...bigStepUpdate};
        await updateBigStep(bigStepData);
        setBigStepUpdate({ title: "", description: "", due: new Date(), responsible: '' });
        navigate(`/boards/${board.title.replace(/\s+/g, '-')}`);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        const newValue = name === "due" ? formatDate(value) : value;
        const newFormData = { ...bigStepUpdate, [name]: newValue };
        setBigStepUpdate(newFormData);
    }

    function handleResponsibleSelect(evt) {
        const responsibleUser = evt.target.value
        setResponsibleUser(responsibleUser);
    }

    // Needs to be updated to only retrieve users of the specific board
    useEffect(function() {
        async function getUsers() {
            const users = await usersAPI.getUsers()
            setUsersGallery(users);
        }
        getUsers()
    }, [])

    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      }

    return (
        <div>
            <h1>Update {bigStep.title}</h1>
            <p>A big step on the {board.title}</p>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleUpdateBigStep}>
                        <label>Title</label>
                        <input type="text" name="title" onChange={handleChange} value={bigStepUpdate.title} required />
                        
                        <label>Description</label>
                        <input type="text" name="description" onChange={handleChange} value={bigStepUpdate.description} required />
                        
                        <label>Due Date</label>
                        <input type="date" name="due" onChange={handleChange} value={bigStepUpdate.due} required />
                        
                        <label>Select Responsible User</label>
                        <select name="responsible" onChange={handleResponsibleSelect}>
                            <option value="">Select a responsible user</option>
                            {usersGallery.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name} | {user.email} 
                            </option>
                            ))}
                        </select>
                    
                        <button type="submit">Add Big Step</button>
                </form>
            </div>
        </div>

    )
}