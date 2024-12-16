import React, { useState, useEffect } from 'react';
import './Mathpuzzle.css';

// Array of questions and answers
const questions = [
  { question: 'What is 6 * 7?', answer: 42 },
  { question: 'What is 12 + 15?', answer: 27 },
  { question: 'What is 9 - 3?', answer: 6 },
  { question: 'What is 8 / 2?', answer: 4 },
  { question: 'What is 5 * 5?', answer: 25 }
];

const MathPuzzles = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  // Shuffle the questions and pick a random one
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setAnswer('');
    setMessage('');
  };

  // Check the user's answer
  const checkAnswer = () => {
    if (parseInt(answer, 10) === currentQuestion.answer) {
      setMessage('Correct!');
    } else {
      setMessage('Try again.');
    }
  };

  // Load a new question on component mount
  useEffect(() => {
    getRandomQuestion();
  }, []);

  return (
    <div className="math-puzzles">
      <h2>Math Puzzle</h2>
      <p>{currentQuestion.question}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={checkAnswer}>Check Answer</button>
      <p>{message}</p>
      <button onClick={getRandomQuestion}>Next Question</button>
    </div>
  );
};

export default MathPuzzles;
