import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { resetGameToStorage, saveGameToStorage, savesStateToStorage } from './storage/storage'


const TURN = {
  X: '❌',
  O: '⚪'
}

const COMBO_WINNER = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// eslint-disable-next-line react/prop-types
const Square = ({ children, updateBoard, isSelected, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(
    () => {
      const boardFromStorage = savesStateToStorage({board:'board'})
      if (boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
    })


  const [turn, setTurn] = useState(() => {
    const turnFromStorage = savesStateToStorage({turn:'turn'});
    return turnFromStorage ?? TURN.X;
  });
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of COMBO_WINNER) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) { return boardToCheck[a] }

    } return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
    resetGameToStorage()
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((x) => x !== null)
  }
  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);
    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)

    }
  }

  return (
    <main className='board'>
      <button onClick={resetGame}>Reset</button>
      <h1>3 en Raya</h1>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>{board[index]}</Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>
      {winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false ? 'Empate' : 'Ganó: '
              }
            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>

          </div>
        </section>
      )}
    </main>
  )
}

export default App
