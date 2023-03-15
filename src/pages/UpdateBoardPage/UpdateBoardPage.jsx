import './UpdateBoardPage.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
// import Select from 'react-select' consider for user search bar later

export default function UpdateBoardPage({ user }) {
  const { boardName } = useParams()
  const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
  const [ boardUpdate, setBoardUpdate ] = useState({ title: '', description: '', admins: [], users: [] })
  const [usersGallery, setUsersGallery] = useState([])
  const [selectedAdmins, setSelectedAdmins] = useState([])
  const navigate = useNavigate()

  
  // // Needs to be updated with Admin priveliges
  // useEffect(function() {
  //   async function checkUser() {
  //     const boardAdmins = boardUpdate.admins
  //     console.log("boardAdmins", boardAdmins)

  //     const verifiedEditors = [...boardAdmins]
  //     console.log("verifiedEditors", verifiedEditors)

  //     const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === user._id)

  //     if(!verifiedAdmin) { 
  //       navigate(`/boards/${boardName}`)
  //     }
  //   }
  //   checkUser()
  // }, [boardNameActual, boardName, user, navigate])

  useEffect(function() {
      async function getBoard() {
        const board = await boardsAPI.getUserBoard(boardNameActual)
        setBoardUpdate(board)
      }
      getBoard()
    }, [boardNameActual])
    
  
  async function updateBoard(boardUpdate) {
    return await boardsAPI.updateBoard(boardUpdate)
  }
    
  async function handleUpdateBoard(evt) {
    evt.preventDefault()
    const boardData = { ...boardUpdate, admins: selectedAdmins, _id: boardUpdate._id }
    const updatedBoard = await updateBoard(boardData)
    setBoardUpdate({ title: "", description: "", admins: [], users: [] })
    setSelectedAdmins(selectedAdmins)
    
    const newUrl = updatedBoard.title ? updatedBoard.title.replace(/\s+/g, '-') : ''

    navigate(`/boards/${newUrl}`)
  }
    
  function handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const newFormData = {...boardUpdate, [name]: value }
    setBoardUpdate(newFormData)
  }

  function handleAdminSelect(evt) {
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
      selectedAdmins.unshift(user._id)
      setSelectedAdmins(selectedAdmins)
    }
  }

  useEffect(function() {
    async function getUsers() {
      let users = []
      users = await usersAPI.getUsers()
      // const otherUsers = users.filter((u) => u._id !== user._id)
      // setUsersGallery(otherUsers)
      setUsersGallery(users)
    }
    getUsers()
}, [user._id])

  return (
      <div>
          <div className="form-container">
            <h1 className="update-board-update-h1">Update {boardUpdate.title}</h1>
              <form autoComplete="off" onSubmit={handleUpdateBoard}>
                  <label>Title</label>
                  <input type="text" name="title" onChange={handleChange} value={boardUpdate.title} />
                  <label>Description</label>
                  <input type="text" name="description" onChange={handleChange} value={boardUpdate.description}  />
                  <label className="new-board-select-label">Confirm Admins</label>
                  <select name="admins" multiple onChange={handleAdminSelect} className="update-board-select-options">
                    {usersGallery.map((user) => (
                      <option key={user._id} value={user._id} className="update-board-select-options" >
                        {user.name}   -   {user.email}
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