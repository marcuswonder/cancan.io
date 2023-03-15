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
      className="boards-list-board-card-container"
      onMouseOver={() => {
        setHoveredTitle(board.totalBigSteps);
        setHoveredDescription('% complete');
      }}
      onMouseOut={() => {
        setHoveredTitle(null);
        setHoveredDescription(null);
      }}
    >
      <div className="boards-list-board-card">
        <div className="boards-list-board-navigation">
          <div className="boards-list-board-navigation-details-container">
            <Link to={`/boards/${board.title.replace(/\s+/g, '-')}`} key={board._id}>
              <img
                className="boards-list-boards-details-icon"
                src={detailsIcon}
                alt="See a detailed view of your board"
                title="See a detailed view of your board"
              />
            </Link>
          </div>
          <div className="boards-list-board-navigation-delete-container">
            <img
              className="boards-list-boards-delete-icon"
              key={board._id}
              onClick={() => onDeleteClick(board)}
              src={deleteIcon}
              alt="Delete this board"
              title="Delete this board"
            />
          </div>
        </div>
        <h2 className="boards-list-board-card-title">
          {hoveredTitle === null ? board.title : board.totalComplete}
        </h2>
        <h2 className="boards-list-board-card-description">
          {hoveredDescription === null ? board.description : '% complete'}
        </h2>
      </div>
    </div>
  );
}
