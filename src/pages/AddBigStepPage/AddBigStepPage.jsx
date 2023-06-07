import './AddBigStepPage.css';
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
import logo from '../../public/assets/idea.png'

export default function AddBigStepPage({ user }) {
    const navigate = useNavigate()
    const [ bigSteps, setBigSteps ] = useState([])
    const [ newBigStep, setNewBigStep ] = useState({ title: '', description: '', due: new Date(), responsible: '' })
    const [usersGallery, setUsersGallery] = useState([])
    const [responsibleUser, setResponsibleUser] = useState('')
    const [board, setBoard] = useState({})
    const [isLoading, setIsLoading] = useState(true)  
    const [error, setError] = useState(null)  
    const { boardName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''

    useEffect(function() {
        async function getBoard(user) {
          let board = await boardsAPI.getBoard(boardNameActual)
          
          while (!board.admins) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
    
            try {
              function checkAuthorisation(user, board) {
                  const verifiedBoardUser = board.users.find(boardUser => boardUser._id === user._id)
                  const verifiedBoardAdmin = board.admins.find(boardAdmin => boardAdmin._id === user._id)
                  
                  if (verifiedBoardAdmin || verifiedBoardUser) {
                      return true
                  
                  } else {
                      return false
                  }
              }
    
              if (checkAuthorisation(user, board)) {
                setBoard(board)
                setIsLoading(false)
    
              } else {
                const error = await board.json();
                throw new Error(error);
              }
              
            } catch (error) {
              setError(error)
            }
        }
        getBoard(user)
      }, [boardNameActual, user, setIsLoading, setError])

    async function handleCreateBigStep(evt) {
        evt.preventDefault();
        newBigStep.author = user._id;
        newBigStep.board = board._id;
        newBigStep.responsible = responsibleUser;
        const createdBigStep = await boardsAPI.createBigStep(newBigStep);
        setBigSteps([...bigSteps, createdBigStep]);
        setNewBigStep({ title: "", description: "", due: new Date() });
        navigate(`/boards/${board.title.replace(/\s+/g, '-')}`)
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
    
    if (error) {
        return (
        <div className="error-container">
            <img className="error-logo" src={logo} alt='cancan logo'/>
            <h1 className="error-h1-text">Sorry, you are not authorised to use this board</h1>    
            <div>
            <>
                <Link to={`/boards`} ><button>my boards</button></Link>
            </>
                        
            </div>
        </div>
        )
        
    } else if (isLoading) {
        return <div>Loading...</div>
    }
    
    else {
        return (
            <div>
                <div className="form-container">
                <h1 className="new-big-step-h1">Add a Big Step to {board.title}</h1>
                    <form autoComplete="off" onSubmit={handleCreateBigStep}>
                            <label>Title</label>
                            <input type="text" name="title" onChange={handleChange} value={newBigStep.title} required />
                            
                            <label>Description</label>
                            <input type="text" name="description" onChange={handleChange} value={newBigStep.description} required />
                            
                            <label>Due Date</label>
                            <input type="date" name="due" onChange={handleChange} value={newBigStep.due} required />
                            
                            <label className="new-big-step-select-label">Who is responsible?</label>
                            <select name="responsible" onChange={handleResponsibleSelect} className="new-big-step-form-select-input" required>
                                <option value="">Select a responsible user</option>
                                {usersGallery.map((user) => (
                                <option key={user._id} value={user._id} className="new-big-step-form-select-input">
                                    {user.name}
                                </option>
                                ))}
                            </select>
                            <div></div>
                            <p className="new-board-form-user-info">Responsible users will have view permissions at all levels of this board and will have write permissions on any big step or baby step that they are responsible for.</p>
                            <button type="submit">Add Big Step</button>
                    </form>
                </div>
            </div>
        )
    }
}