import './UpdateBoardPage.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
import logo from '../../public/assets/idea.png'
// import Select from 'react-select' consider for user search bar later

export default function UpdateBoardPage({ user }) {
  const navigate = useNavigate()
  const { boardName } = useParams()
  const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
  const [ boardUpdate, setBoardUpdate ] = useState({ title: '', description: '', admins: [], users: [] })
  const [usersGallery, setUsersGallery] = useState([])
  const [selectedAdmins, setSelectedAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(true)  
  const [error, setError] = useState(null)
  
  
  useEffect(function() {
    async function getBoard(user) {
      let board = await boardsAPI.getBoard(boardNameActual)
      
      while (!board.admins) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

        try {
          function checkAuthorisation(user, board) {
              const verifiedBoardAdmin = board.admins.find(boardAdmin => boardAdmin._id === user._id)
              
              if (verifiedBoardAdmin) {
                  return true
              
              } else {
                  return false
              }
          }

          if (checkAuthorisation(user, board)) {
            setBoardUpdate(board)
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

  
  async function updateBoard(boardUpdate) {
    console.log("updateBoard function hit")
    return await boardsAPI.updateBoard(boardUpdate)
  }
    
  async function handleUpdateBoard(evt) {
    console.log("handleUpdateBoard function hit")
    evt.preventDefault()
    const boardData = { ...boardUpdate, admins: selectedAdmins, _id: boardUpdate._id }
    const updatedBoard = await updateBoard(boardData)
    setBoardUpdate({ title: "", description: "", admins: [], users: [] })
    setSelectedAdmins(selectedAdmins)
    
    const newUrl = updatedBoard.title ? updatedBoard.title.replace(/\s+/g, '-') : ''

    navigate(`/boards/${newUrl}`)
  }
    
  function handleChange(evt) {
    console.log("handleChange function hit")
    const name = evt.target.name
    const value = evt.target.value
    const newFormData = {...boardUpdate, [name]: value }
    setBoardUpdate(newFormData)
  }

  function handleAdminSelect(evt) {
    console.log("handleAdminSelect function hit")
    const options = evt.target.options
    const selectedAdmins = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedAdmins.push(options[i].value)
      }
    }
    if (selectedAdmins.length === 0) {
      setSelectedAdmins(boardUpdate.admins)
    } else {
      setSelectedAdmins(selectedAdmins)
    }
  }

  useEffect(function() {
    async function getUsers() {
      console.log("getUsers function hit")
      let users = []
      users = await usersAPI.getUsers()
      // const otherUsers = users.filter((u) => u._id !== user._id)
      // setUsersGallery(otherUsers)
      setUsersGallery(users)
    }
    getUsers()
}, [user._id])

  if (error) {
    return (
    <div className="error-container">
        <img className="error-logo" src={logo} alt='cancan logo'/>
        <h1 className="error-h1-text">Sorry, you are not authorised to update this board</h1>
        <div>
        <>
            <Link to={`/boards/${boardName}`} ><button>go back</button></Link>
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
              <h1 className="update-board-update-h1">Update {boardUpdate.title}</h1>
                <form autoComplete="off" onSubmit={handleUpdateBoard}>
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleChange} value={boardUpdate.title} />
                    <label>Description</label>
                    <input type="text" name="description" onChange={handleChange} value={boardUpdate.description}  />
                    <label className="update-board-select-label">Confirm Admins</label>
                    <select name="admins" multiple onChange={handleAdminSelect} className="update-board-select-options" required>
                      {usersGallery.map((user) => (
                        <option key={user._id} value={user._id} className="update-board-select-options" >
                          {user.name}
                        </option>
                      ))}
                    </select>
                    <div></div>
                    <p className="update-board-form-user-info">Admins will have full write permissions at all levels of this board. Users will be allocated specific responsibilities at specific steps within this board.</p>
                    <button type="submit">Update Board</button>
                </form>
            </div>
      </div>

    )
  }
}