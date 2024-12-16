import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Prevent move if square is already filled or game is over
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newBoard));
  };

  const renderSquare = (index) => (
    <div className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  );

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className='iii'>
    <div className="tic-tac-toe">
    <h1>Tic tac toe</h1>
      <div className="board">
        {board.map((_, i) => renderSquare(i))}
      </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : ` Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>
    </div>
    </div>
  );
};

export default TicTacToe;
