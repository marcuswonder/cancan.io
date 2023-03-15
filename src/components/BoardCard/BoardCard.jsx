import './BoardCard.css';
import detailsIcon from '../../public/assets/details-white.png';
import deleteIcon from '../../public/assets/delete-icon-white.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BoardCard({ board, onDeleteClick }) {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const [hoveredDescription, setHoveredDescription] = useState(null);

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
      <div className="card-body-board-card">
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
              onClick={() => onDeleteClick(board)}
              src={deleteIcon}
              alt="Delete this board"
              title="Delete this board"
            />
          </div>
        </div>
        <h2 className="card-body-board-card-title">
          {hoveredTitle === null ? board.title : board.totalComplete.toFixed(0)}
        </h2>
        <h2 className="card-body-board-card-description">
          {hoveredDescription === null ? board.description : '% complete'}
        </h2>
      </div>
    </div>
  );
}