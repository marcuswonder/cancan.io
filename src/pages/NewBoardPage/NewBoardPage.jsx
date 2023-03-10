import './NewBoardPage.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
// import Select from 'react-select'; consider for user search bar later

export default function NewBoardPage({ user }) {
  const navigate = useNavigate()
  const [ boards, setBoards ] = useState([])
  const [ newBoard, setNewBoard ] = useState({ title: '', description: '', users: [] })
  const [usersGallery, setUsersGallery] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])


  async function handleCreateBoard(evt) {
    evt.preventDefault()
    const boardData = {...newBoard, author: user._id, users: selectedUsers}
    const createdBoard = await boardsAPI.createBoard(boardData)
    setBoards([...boards, createdBoard])
    setNewBoard({ title: "", description: "", users: [] })
    setSelectedUsers([]);
    navigate(`/boards/${boardData.title.replace(/\s+/g, '-')}`)
  }
  

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const newFormData = {...newBoard, [name]: value }
    setNewBoard(newFormData);
  }

  function handleUserSelect(evt) {
    const options = evt.target.options;
    const selectedUsers = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedUsers.push(options[i].value)
      }
    }
    setSelectedUsers(selectedUsers);
  }

  useEffect(function() {
    async function getUsers() {
      let users = []
      users = await usersAPI.getUsers()
      const otherUsers = users.filter((u) => u._id !== user._id)
      setUsersGallery(otherUsers)
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
                  <label>Select Users</label>
                  <select  name="users" multiple onChange={handleUserSelect} className="form-select" >
                    {usersGallery.map((user) => (
                      <option key={user._id} value={user._id} className="form-select-input" >
                        {user.name}
                      </option>
                    ))}
                  </select>
                  
                  <button type="submit">Create Board</button>
              </form>
          </div>
    </div>

  )
}