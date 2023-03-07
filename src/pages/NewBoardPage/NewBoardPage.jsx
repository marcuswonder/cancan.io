import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'
import * as usersAPI from '../../utilities/users-api'
// import Select from 'react-select'; consider for user search bar later

export default function NewBoardPage({ userProp }) {
  const [ boards, setBoards ] = useState([])
  const [ newBoard, setNewBoard ] = useState({ title: '', description: '', users: [] })
  const [usersGallery, setUsersGallery] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])

  const navigate = useNavigate()

  async function createBoard(newBoard) {
    newBoard.users = selectedUsers;
    const createdBoard = await boardsAPI.createBoard(newBoard);
    setBoards([...boards, createdBoard]);
  }
    
  async function handleCreateBoard(evt) {
    evt.preventDefault();
    const boardData = { ...newBoard, users: selectedUsers };
    await createBoard(boardData);
    setNewBoard({ title: "", description: "", users: [] });
    setSelectedUsers([]);
    navigate("/boards");
  }
    
  // function handleChange(evt) {
  //   const newFormData = {
  //     ...newBoard,
  //     [evt.target.name]: evt.target.value,
  //   }
  //   setNewBoard(newFormData);
  // }


  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/; // regex to match only alphanumeric characters and spaces
    if (name === 'title' || name === 'description') {
      if (regex.test(value)) {
        const newFormData = {
          ...newBoard,
          [name]: value,
        };
        setNewBoard(newFormData);
      }
    } else {
      const newFormData = {
        ...newBoard,
        [name]: value,
      };
      setNewBoard(newFormData);
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
      const users = await usersAPI.getUsers()
      const otherUsers = users.filter(user => user._id !== userProp._id)
      setUsersGallery(otherUsers);
    }
    getUsers()
}, [userProp._id])

  return (
      <div>
          <h1>New Board</h1>
          <div className="form-container">
              <form autoComplete="off" onSubmit={handleCreateBoard}>
                  <label>Title</label>
                  <input type="text" name="title" onChange={handleChange} value={newBoard.title} required />
                  <label>Description</label>
                  <input type="text" name="description" onChange={handleChange} value={newBoard.description} required />
                  <label>Add Users</label>
                  <select name="users" multiple onChange={handleUserSelect}>
                    {usersGallery.map((user) => (
                      <option key={user._id} value={user._id}>
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