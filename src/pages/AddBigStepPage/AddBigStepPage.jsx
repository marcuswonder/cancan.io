import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as bigStepsAPI from '../../utilities/big-steps-api'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'

export default function AddBigStepPage({ user }) {
    const navigate = useNavigate()
    const [ bigSteps, setBigSteps ] = useState([])
    const [ newBigStep, setNewBigStep ] = useState({ title: '', description: '', due: new Date(), responsible: '' })
    const [usersGallery, setUsersGallery] = useState([])
    const [responsibleUser, setResponsibleUser] = useState('')
    const [board, setBoard] = useState({})
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    useEffect(function() {
        async function getBoard() {
            const board = await boardsAPI.getUserBoard(boardNameActual)
            setBoard(board)
        }
        getBoard()
    }, [boardNameActual])


    async function createBigStep(newBigStep) {
        newBigStep.author = user._id
        newBigStep.board = board._id
        newBigStep.responsible = responsibleUser
        const createdBigStep = await bigStepsAPI.createBigStep(newBigStep);
        setBigSteps([...bigSteps, createdBigStep]);
    }
    
    async function handleCreateBigStep(evt) {
        evt.preventDefault();
        const bigStepData = { ...newBigStep};
        await createBigStep(bigStepData);
        setNewBigStep({ title: "", description: "", due: new Date() });
        // setResponsibleUser();
        // Navigation needs to be updated! Also in the NewBoardPage
        navigate("/boards");
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
      
        const newValue = name === "due" ? formatDate(value) : value;
      
        const newFormData = { ...newBigStep, [name]: newValue };
        setNewBigStep(newFormData);
      }

    function handleResponsibleSelect(evt) {
        const responsibleUser = evt.target.value
        setResponsibleUser(responsibleUser);
    }

    // Needs to be updated to only retrieve users of the specific board
    useEffect(function() {
        async function getUsers() {
            let users = []
            users = await usersAPI.getUsers()
            setUsersGallery(users);
        }
        getUsers()
    }, [user._id])

    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      }

    return (
        <div>
            <h1>Add Big Step to ${board.name}</h1>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleCreateBigStep}>
                        <label>Title</label>
                        <input type="text" name="title" onChange={handleChange} value={newBigStep.title} required />
                        
                        <label>Description</label>
                        <input type="text" name="description" onChange={handleChange} value={newBigStep.description} required />
                        
                        <label>Due Date</label>
                        <input type="date" name="due" onChange={handleChange} value={newBigStep.due} required />
                        
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