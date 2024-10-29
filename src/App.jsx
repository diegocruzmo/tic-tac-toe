import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import Square from './components/Square'
import { TURNS } from './constants.js'
import { checkWinner } from './utils/board.js'
import Winner from './components/Winner.jsx'
import { saveGameStorage, resetGameStorage } from './storage/index.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocal = window.localStorage.getItem('board')
    return boardFromLocal ? JSON.parse(boardFromLocal) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocal = window.localStorage.getItem('turn')
    return turnFromLocal ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (idx) => {
    if (board[idx] || winner) {
      return
    }

    const newBoard = [...board]
    newBoard[idx] = turn
    setBoard(newBoard)

    const changeTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(changeTurn)

    saveGameStorage({ board: newBoard, turn: changeTurn })

    if (checkWinner(newBoard)) {
      confetti()
      setWinner(checkWinner(newBoard))
    } else if (newBoard.every((square) => square !== null)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)
    resetGameStorage()
  }

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <section className='game'>
          {board.map((_, idx) => (
            <Square updateBoard={updateBoard} key={idx} idx={idx}>
              {board[idx]}
            </Square>
          ))}
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <button onClick={resetGame}>Reset Game</button>

        <Winner winner={winner} resetGame={resetGame} />
      </main>
    </>
  )
}

export default App
