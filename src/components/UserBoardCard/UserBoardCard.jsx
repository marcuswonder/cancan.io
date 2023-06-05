import './UserBoardCard.css'
import editIcon from '../../public/assets/edit.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function UserBoardCard({ board, onDeleteClick }) {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredDescription, setHoveredDescription] = useState(null);
  const navigate = useNavigate()
  const boardName = board.title.replace(/\s+/g, '-')

  function handleBoardClick(board) {
    navigate(`/boards/${boardName}`)
  }

  
  return (
    <div
      className="card-body-board-card-container"
      onMouseOver={() => {
        setHoveredTitle();
        setHoveredDescription();
      }}
      onMouseOut={() => {
        setHoveredTitle(null);
        setHoveredDescription(null);
      }}
    >
      
      <div className="card-body-board-card" onClick={() => handleBoardClick(board)} >
          <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.completionRate}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : '% complete'}
          </h2>

          {/* <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.totalBigSteps}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : 'Total Big Steps'}
          </h2>

          <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.totalBigStepsWithBabySteps}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : 'Total Big Steps with Baby Steps'}
          </h2>

          <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.totalBigStepsWithoutBabySteps}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : 'Total Big Steps without Baby Steps'}
          </h2>

          <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.completeBigStepsWithoutBabySteps}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : 'Complete Big Steps Without Baby Steps'}
          </h2>

          <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.totalBabySteps}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : 'Total Baby Steps'}
          </h2>

          <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.totalCompleteBabySteps}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : 'Total Complete Baby Steps'}
          </h2> */}
          
      </div>
    </div>
  );
}
