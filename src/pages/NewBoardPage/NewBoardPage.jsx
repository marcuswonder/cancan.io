import './NewBoardPage.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
// import Select from 'react-select' consider for user search bar later

export default function NewBoardPage({ user }) {
  const navigate = useNavigate()
  const [ boards, setBoards ] = useState([])
  const [ newBoard, setNewBoard ] = useState({ title: '', description: '', admins: [], users: [] })
  const [usersGallery, setUsersGallery] = useState([])
  const [selectedAdmins, setSelectedAdmins] = useState([])


  async function handleCreateBoard(evt) {
    evt.preventDefault()
    const boardData = {...newBoard, author: user._id, admins: selectedAdmins}
    const createdBoard = await boardsAPI.createBoard(boardData)
    setBoards([...boards, createdBoard])
    setNewBoard({ title: "", description: "", admins: [], users: [] })
    setSelectedAdmins([])
    navigate(`/boards/${boardData.title.replace(/\s+/g, '-')}`)
  }
  

  function handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const newFormData = {...newBoard, [name]: value }
    setNewBoard(newFormData)
  }

  function handleAdminSelect(evt) {
    const options = evt.target.options
    const selectedAdmins = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedAdmins.push(options[i].value)
      }
    }
    selectedAdmins.unshift(user._id)
    setSelectedAdmins(selectedAdmins)
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
          <h1 className="new-board-h1">New Board</h1>
              <form autoComplete="off" onSubmit={handleCreateBoard}>
                  <label>Title</label>
                  <input type="text" name="title" onChange={handleChange} value={newBoard.title} required />
                  <label>Description</label>
                  <input type="text" name="description" onChange={handleChange} value={newBoard.description} required />
                  <label className="new-board-select-label">Choose Admins for this board</label>
                  <select  name="admins" multiple onChange={handleAdminSelect}  className="new-board-form-select-input" required >
                    {usersGallery.map((user) => (
                      <option key={user._id} value={user._id} className="new-board-form-select-input" >
                        {user.name}   -   {user.email}
                      </option>
                    ))}
                  </select>
                  <div></div>
                  <p className="new-board-form-user-info">Admins will have full write permissions at all levels of this board. Users will be allocated specific responsibilities at specific steps within this board.</p>
                  
                  <button type="submit">Create Board</button>
              </form>
          </div>
    </div>

  )
}