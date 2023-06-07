import './UpdateBigStepPage.css';
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
import logo from '../../public/assets/idea.png'

export default function UpdateBigStepPage({ user }) {
    const navigate = useNavigate()
    const { bigStepName, boardName } = useParams()
    const bigStepNameActual = bigStepName ? bigStepName.replace(/-/g, ' ') : ''
    const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
    
    const [ bigSteps, setBigSteps ] = useState([])
    const [ bigStepUpdate, setBigStepUpdate ] = useState({ title: '', description: '', due: '', responsible: '' })
    const [ usersGallery, setUsersGallery ] = useState([])
    const [ responsibleUser, setResponsibleUser ] = useState('')
    const [ board, setBoard ] = useState({})
    const [isLoading, setIsLoading] = useState(true)  
    const [error, setError] = useState(null)  

    // useEffect(function() {
    //     async function getBoard() {
    //         const board = await boardsAPI.getBoard(boardNameActual)
    //         setBoard(board)
    //         const bigStep = board.bigSteps.find(bStep => bStep.title === bigStepNameActual)
    //         setBigStepUpdate(bigStep)
    //     }
    //     getBoard()
    // }, [boardNameActual, bigStepNameActual])

    useEffect(function() {
        async function getBoard(user) {
          try {
            const board = await boardsAPI.getBoard(boardNameActual)
            const bigStep = await board.bigSteps.find(bStep => bStep.title === bigStepNameActual)
            
            if((checkVerifiedBigStepResponsible(bigStep, user) === true) || (checkVerifiedBoardAdmin(board, user) === true)) { 
                setBoard(board)
                setBigStepUpdate(bigStep)
              
            } else {          
                const error = await board.json()
                throw new Error(error)
            }
    
          } catch (error) {
            setError(error)
          }
        setIsLoading(false)
        }
      getBoard(user)
      }, [boardNameActual, bigStepNameActual, setBoard, setIsLoading])
    
    async function updateBigStep(bigStepUpdate) {
        const updatedBigStep = await boardsAPI.updateBigStep(bigStepUpdate);
        setBigSteps([...bigSteps, updatedBigStep]);
    }
    
    async function handleUpdateBigStep(evt) {
        evt.preventDefault();
        const bigStepData = { ...bigStepUpdate, _id: bigStepUpdate._id, author: user._id, board: board._id};
        await updateBigStep(bigStepData);
        setBigStepUpdate({ title: "", description: "", due: new Date(), responsible: '' });
        navigate(`/boards/${board.title.replace(/\s+/g, '-')}`);
    }

    async function handleChange(evt) {
        const { name, value } = evt.target;
        const newDueDate = name === "due" ? formatDate(value) : value;
        if( name === "responsible") {
            const responsibleUserId = evt.target.value;
            const responsibleUser = usersGallery.find(user => user._id === responsibleUserId);
            setResponsibleUser(responsibleUser);
            bigStepUpdate.responsible = responsibleUser
        }
        const newFormData = { ...bigStepUpdate, [name]: newDueDate};
        setBigStepUpdate(newFormData);
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
      

      async function checkVerifiedBigStepResponsible(bigStep, user) {
        try {
            const verifiedBigStepResponsible = bigStep.responsible._id === user._id
            console.log("verifiedBigStepResponsible", verifiedBigStepResponsible)
        
            if(verifiedBigStepResponsible) {
                return true
            }
    
        } catch (error) {
        }
      }
        
      async function checkVerifiedBoardAdmin(board, user) {
        try {
          const verifiedBoardAdmin = board.admins.find(boardAdmin => boardAdmin._id === user._id)
          console.log("verifiedBoardAdmin", verifiedBoardAdmin)
          
          if(verifiedBoardAdmin) {
            console.log("verifiedBoardAdmin", verifiedBoardAdmin)
            return true
          }
        } catch (error) {
        }
      }
    
        if (error) {
          return (
            <div className="error-container">
              <img className="error-logo" src={logo} alt='cancan logo'/>
              <h1 className="error-h1-text">Sorry, you are not authorised to update this Big Step</h1>    
              <h3 className="error-h3-text">Only the user responsible and Board admins can update this</h3>    
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
                        <h1 className="update-big-step-update-h1">Update {bigStepUpdate.title}</h1>
                        <form autoComplete="off" onSubmit={handleUpdateBigStep}>
                                <label>Title</label>
                                <input type="text" name="title" onChange={handleChange} value={bigStepUpdate.title} required/>
                                
                                <label>Description</label>
                                <input type="text" name="description" onChange={handleChange} value={bigStepUpdate.description} required/>
                                
                                <label>Due Date</label>
                                <input type="date" name="due" onChange={handleChange} value={formatDate(bigStepUpdate.due)} required/>
                                
                                <label className="update-big-step-select-label">Responsible User</label>
                                <select name="responsible" onChange={handleChange} value={bigStepUpdate.responsible._id} className="update-big-step-select-options" >
                                    <option value="" className="update-big-step-select-options">Confirm responsible user</option>
                                    {usersGallery.map((user) => (
                                    <option key={user._id} value={user._id} className="update-big-step-select-options">
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
}