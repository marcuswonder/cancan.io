import './AddBabyStepPage.css';
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
import logo from '../../public/assets/idea.png'

export default function AddBabyStepPage({ user }) {
    const navigate = useNavigate()
    const [ babySteps, setBabySteps ] = useState([])
    const [ newBabyStep, setNewBabyStep ] = useState({ title: '', description: '', due: new Date(), responsible: '' })
    const [usersGallery, setUsersGallery] = useState([])
    const [responsibleUser, setResponsibleUser] = useState('')
    const [board, setBoard] = useState({})
    const [bigStep, setBigStep] = useState()
    const [ isLoading, setIsLoading ] = useState(true)  
    const [ error, setError ] = useState(null)  
    const { boardName, bigStepName } = useParams()
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    const bigStepNameActual = bigStepName ? bigStepName.replace(/-/g, ' ') : ''

    useEffect(function() {
        async function getBoard(user) {
          let board = await boardsAPI.getBoard(boardNameActual)
          const bigStep = await board.bigSteps.find(bStep => bStep.title === bigStepNameActual)
          
          while (!bigStep) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
    
            try {
              function checkAuthorisation(user, board) {
                  const verifiedBigStepResponsible = bigStep.responsible._id === user._id
                  const verifiedBoardAdmin = board.admins.find(boardAdmin => boardAdmin._id === user._id)
                  
                  if (verifiedBoardAdmin || verifiedBigStepResponsible) {
                      return true
                  
                  } else {
                      return false
                  }
              }
    
              if (checkAuthorisation(user, board)) {
                setBoard(board)
                setBigStep(bigStep)
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

    async function handleCreateBabyStep(evt) {
        evt.preventDefault();
        newBabyStep.author = user._id
        newBabyStep.board = board._id
        newBabyStep.bigStep = bigStep._id
        newBabyStep.responsible = responsibleUser
        const createdBabyStep = await boardsAPI.createBabyStep(board, bigStep, newBabyStep)
        setBabySteps([...babySteps, createdBabyStep])
        setNewBabyStep({ title: "", description: "", due: new Date() })
        navigate(`/boards/${board.title.replace(/\s+/g, '-')}/${bigStep.title.replace(/\s+/g, '-')}`)
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
      
        const newValue = name === "due" ? formatDate(value) : value;
      
        const newFormData = { ...newBabyStep, [name]: newValue };
        setNewBabyStep(newFormData);
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

    if (error) {
        return (
            <div className="error-container">
            <img className="error-logo" src={logo} alt='cancan logo'/>
            <h1 className="error-h1-text">Sorry, you are not authorised to add a Baby Step to this Big Step</h1>    
            <h3 className="error-h3-text">Only the user responsible and Board admins can do this</h3>    
            <div>
                <>
                <Link to={`/boards/${boardName}/${bigStepName}`} ><button>go back</button></Link>
                </>
                        
            </div>
            </div>
        )
        
    } else if (isLoading) {
    return <div>Loading...</div>
    }
    
    else {
        return (
            <>
            {!bigStep ?
                <div>Loading...</div>
            :
                <div>
                    <div className="form-container">
                        <h1 className="new-baby-step-h1">Add a Baby Step to {bigStep.title}</h1>
                        <form autoComplete="off" onSubmit={handleCreateBabyStep}>
                                <label>Title</label>
                                <input type="text" name="title" onChange={handleChange} value={newBabyStep.title} required />
                                
                                <label>Description</label>
                                <input type="text" name="description" onChange={handleChange} value={newBabyStep.description} required />
                                
                                <label>Due Date</label>
                                <input type="date" name="due" onChange={handleChange} value={newBabyStep.due} required />
                                
                                <label className="new-baby-step-select-label">Who is responsible?</label>
                                <select name="responsible" onChange={handleResponsibleSelect} className="new-baby-step-form-select-input" required>
                                    <option value="">Select a responsible user</option>
                                    {usersGallery.map((user) => (
                                    <option key={user._id} value={user._id} className="new-baby-step-form-select-input">
                                        {user.name}
                                    </option>
                                    ))}
                                </select>
                                <div></div>
                                <p className="new-board-form-user-info">Responsible users will have view permissions at all levels of this board and will have write permissions on any big step or baby step that they are responsible for.</p>
                                <button type="submit">Add Baby Step</button>
                        </form>
                    </div>
                </div>
            }
            </>
        )
    }
                
}