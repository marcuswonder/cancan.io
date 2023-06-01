import './BoardCard.css';
import detailsIcon from '../../public/assets/details-white.png';
import deleteIcon from '../../public/assets/delete-icon-white.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function BoardCard({ board, onDeleteClick }) {
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
        setHoveredTitle(board.totalBigSteps);
        setHoveredDescription('% complete');
      }}
      onMouseOut={() => {
        setHoveredTitle(null);
        setHoveredDescription(null);
      }}
    >
      
      <div className="card-body-board-card" onClick={() => handleBoardClick(board)} >
          <div className="card-body-board-navigation">
            <div className="card-body-board-navigation-details-container">
              <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}>
                <img
                  className="card-body-boards-details-icon"
                  src={detailsIcon}
                  alt="See a detailed view of your board"
                  title="See a detailed view of your board"
                />
              </Link>
            </div>
            <div className="card-body-board-navigation-delete-container">
              <img
                className="card-body-boards-delete-icon"
                key={board._id}
                onClick={(evt) => {evt.stopPropagation(); onDeleteClick(board)}}
                src={deleteIcon}
                alt="Delete this board"
                title="Delete this board"
              />
            </div>
          </div>
          {/* <h2 className="card-body-board-card-title">
            {hoveredTitle === null ? board.title : board?.totalComplete.toFixed(0)}
          </h2>
          <h2 className="card-body-board-card-description">
            {hoveredDescription === null ? board.description : '% complete'}
          </h2> */}

          <h2 className="card-body-board-card-title">
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
          </h2>
      </div>
    </div>
  );
}
