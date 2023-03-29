import { useState } from "react";
import Board from "./Board";
import { v4 } from 'uuid';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMoves, setCurrentMove] = useState(0);
  const xIsNext = currentMoves % 2 === 0;
  const currentSquares = history[currentMoves];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMoves + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={v4()}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}