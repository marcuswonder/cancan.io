import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewBoardPage({createBoard, user}) {
  // console.log("New Board Page Line 4", createBoard)
  const [ newBoard, setNewBoard ] = useState({ title: '', description: '', users: [] })
  const navigate = useNavigate()
    
  function handleCreateBoard(evt) {
    evt.preventDefault()
    createBoard(newBoard)
    setNewBoard({ title: '', description: '', users: [] })
    navigate('/boards')
  }
    
  function handleChange(evt) {
    const newFormData = {
      ...newBoard,
      [evt.target.name]: evt.target.value,
    }
    setNewBoard(newFormData);
  }

  return (
      <div>
          <h1>New Board</h1>
          <div className="form-container">
              <form autoComplete="off" onSubmit={handleCreateBoard}>
                  <label>Title</label>
                  <input type="text" name="title" onChange={handleChange} value={newBoard.title} required />
                  <label>Description</label>
                  <input type="text" name="description" onChange={handleChange} value={newBoard.description} required />
                  {/* Need something for users */}
                  
                  <button type="submit">Create Board</button>
              </form>
          </div>
    </div>

  )
}