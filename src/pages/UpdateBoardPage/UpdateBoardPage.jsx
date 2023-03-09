import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
// import Select from 'react-select'; consider for user search bar later

export default function UpdateBoardPage({ user }) {
  const { boardName } = useParams()
  const boardNameActual = boardName ? boardName.replace(/-/g, ' ') : ''
  const [ boardUpdate, setBoardUpdate ] = useState({ title: '', description: '', users: [] })
  const [usersGallery, setUsersGallery] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const navigate = useNavigate()

  useEffect(function() {
    async function checkUser() {
      const board = await boardsAPI.getUserBoard(boardNameActual)
      if (user._id !== board.author._id) {
        navigate(`/boards/${boardName}`);
      }
    }
    checkUser()
  }, [boardNameActual, boardName, user, navigate]);

  useEffect(function() {
      async function getBoard() {
        const board = await boardsAPI.getUserBoard(boardNameActual)
        setBoardUpdate(board)
      }
      getBoard()
    }, [boardNameActual])
    
    async function updateBoard(boardUpdate) {
      boardUpdate.users = selectedUsers
      return await boardsAPI.updateBoard(boardUpdate)
  }
    
  async function handleUpdateBoard(evt) {
    evt.preventDefault();
    const boardData = { ...boardUpdate, users: selectedUsers, _id: boardUpdate._id };
    const updatedBoard = await updateBoard(boardData);
    setBoardUpdate({ title: "", description: "", users: [] });
    setSelectedUsers([]);
    
    const newUrl = updatedBoard.title ? updatedBoard.title.replace(/\s+/g, '-') : ''

    navigate(`/boards/${newUrl}`);
  }
    
  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/; // regex to match only alphanumeric characters and spaces
    if (name === 'title' || name === 'description') {
      if (regex.test(value)) {
        const newFormData = {
          ...boardUpdate,
          [name]: value,
        };
        setBoardUpdate(newFormData);
      }
    } else {
      const newFormData = {
        ...boardUpdate,
        [name]: value,
      };
      setBoardUpdate(newFormData);
    }
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
          <h1>{boardUpdate.title}</h1>
          <div className="form-container">
              <form autoComplete="off" onSubmit={handleUpdateBoard}>
                  <label>Title</label>
                  <input type="text" name="title" onChange={handleChange} value={boardUpdate.title} />
                  <label>Description</label>
                  <input type="text" name="description" onChange={handleChange} value={boardUpdate.description}  />
                  <label>Confirm Users</label>
                  <select name="users" multiple onChange={handleUserSelect}>
                    {usersGallery.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  
                  <button type="submit">Update Board</button>
              </form>
          </div>
    </div>

  )
}