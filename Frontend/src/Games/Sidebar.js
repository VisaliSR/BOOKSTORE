import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate('/TicTacToe')}>Tic Tac Toe</li>
        <li onClick={() => navigate('/MathPuzzles')}>Math Puzzles</li>
        <li onClick={() => navigate('/games/wordpuzzlegame')}>Word Puzzle Game</li>
        <li onClick={() => navigate('/games/puzzle')}>Puzzle</li>
      </ul>
    </div>
  );
}

export default Sidebar;