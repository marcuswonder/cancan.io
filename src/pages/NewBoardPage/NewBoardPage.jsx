import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as boardsAPI from '../../utilities/boards-api'

export default function NewBoardPage({}) {
  // console.log("New Board Page Line 4", createBoard)
  const [ boards, setBoards ] = useState([])
  const [ newBoard, setNewBoard ] = useState({ title: '', description: '', users: [] })
  const navigate = useNavigate()

  async function createBoard(newBoard) {
    await boardsAPI.createBoard(newBoard)
    setBoards([...[boards], newBoard])
  }
    
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