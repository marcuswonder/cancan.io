import './UpdateBabyStepPage.css';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
import logo from '../../public/assets/idea.png'

export default function UpdateBabyStepPage({ user }) {
    const navigate = useNavigate()
    const { boardName, bigStepName, babyStepName } = useParams()

    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    const bigStepNameActual = bigStepName ? bigStepName.replace(/-/g, ' ') : ''
    const babyStepNameActual = babyStepName ? babyStepName.replace(/-/g, ' ') : ''
    
    const [ board, setBoard ] = useState({})
    const [ bigStep, setBigStep ] = useState({})
    const [ babySteps, setBabySteps ] = useState([])
    const [ babyStepUpdate, setBabyStepUpdate ] = useState({ title: '', description: '', due: '', responsible: '' })
    const [ usersGallery, setUsersGallery ] = useState([])
    const [ responsibleUser, setResponsibleUser ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)  
    const [ error, setError ] = useState(null)  

    useEffect(function() {
        async function getBoard() {
            const board = await boardsAPI.getBoard(boardNameActual)
            setBoard(board)
        }
          getBoard()
    }, [boardNameActual])

    useEffect(function() {
        async function getBabyStep() {
            const board = await boardsAPI.getBoard(boardNameActual)
            const bigStep = board.bigSteps.find(bStep => bStep.title === bigStepNameActual)
            setBigStep(bigStep)
            const babyStep = bigStep.babySteps.find((bStep) => bStep.title === babyStepNameActual)
            setBabyStepUpdate(babyStep)
        }
        getBabyStep()
    }, [board, boardNameActual, bigStepNameActual, babyStepNameActual])


    async function updateBabyStep(babyStepUpdate) {
        const updatedBabyStep = await boardsAPI.updateBabyStep(babyStepUpdate);
        setBabySteps([...babySteps, updatedBabyStep]);
    }
    
    async function handleUpdateBabyStep(evt) {
        evt.preventDefault();
        const babyStepData = { ...babyStepUpdate, _id: babyStepUpdate._id, author: user._id, board: board._id};
        await updateBabyStep(babyStepData);
        setBabyStepUpdate({ title: "", description: "", due: new Date(), responsible: '' });
        navigate(`/boards/${board.title.replace(/\s+/g, '-')}/${bigStep.title.replace(/\s+/g, '-')}`);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        const newDueDate = name === "due" ? formatDate(value) : value;
        if( name === "responsible") {
            const responsibleUserId = evt.target.value;
            const responsibleUser = usersGallery.find(user => user._id === responsibleUserId);
            setResponsibleUser(responsibleUser);
            babyStepUpdate.responsible = responsibleUser
        }
        const newFormData = { ...babyStepUpdate, [name]: newDueDate };
        setBabyStepUpdate(newFormData);
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
            <div className="form-container">
                <h1 className="update-baby-step-update-h1">Update {babyStepUpdate.title}</h1>
                <form autoComplete="off" onSubmit={handleUpdateBabyStep}>
                        <label>Title</label>
                        <input type="text" name="title" onChange={handleChange} value={babyStepUpdate.title} required/>
                        
                        <label>Description</label>
                        <input type="text" name="description" onChange={handleChange} value={babyStepUpdate.description} required/>
                        
                        <label>Due Date</label>
                        <input type="date" name="due" onChange={handleChange} value={formatDate(babyStepUpdate.due)} required/>
                        
                        <label className="update-baby-step-select-label">Responsible User</label>
                        <select name="responsible" onChange={handleChange} value={babyStepUpdate.responsible._id} className="update-big-step-select-options" >
                            <option value="" className="update-baby-step-select-options">Confirm responsible user</option>
                            {usersGallery.map((user) => (
                            <option key={user._id} value={user._id} className="update-baby-step-select-options">
                                {user.name}
                            </option>
                            ))}
                        </select>
                        <div></div>
                        <p className="new-board-form-user-info">Responsible users will have view permissions at all levels of this board and will have write permissions on any big step or baby step that they are responsible for.</p>
                    
                        <button type="submit">Update Big Step</button>
                </form>
            </div>
        </div>

    )
}