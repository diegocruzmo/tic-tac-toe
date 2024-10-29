import Square from './Square'

const Winner = ({ winner, resetGame }) => {
  if (winner === null) return null

  const winnerText = winner ? 'Won: ' : 'Draw'
  return (
    <>
      <section className='winner'>
        <div className='text'>
          <h2>{winnerText}</h2>
          <header className='win'>{winner && <Square>{winner}</Square>}</header>

          <footer>
            <button onClick={resetGame}>Play again!</button>
          </footer>
        </div>
      </section>
    </>
  )
}

export default Winner
