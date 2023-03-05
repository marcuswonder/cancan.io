import { useState } from 'react'

export default function NewBoardPage({createBoard, user}) {
    // console.log("New Board Page Line 4", createBoard)
    const [ newBoard, setNewBoard ] = useState({ title: '', description: '', users: [] })
    
   function handleCreateBoard(evt) {
    evt.preventDefault()
    createBoard(newBoard)
    setNewBoard({ title: '', description: '', users: [] })
   }
    
   function handleChange(evt) {
    const newFormData = {
      ...newBoard,
      [evt.target.name]: evt.target.value,
    //   user: user
    };
    setNewBoard(newFormData);
  }

    return (
        <div>
            <h1>Create Form</h1>
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