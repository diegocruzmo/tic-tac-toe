import PropTypes from 'prop-types'

const Square = ({ children, updateBoard, idx, isSelected }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(idx)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

Square.propTypes = {
  children: PropTypes.node,
  updateBoard: PropTypes.func,
  idx: PropTypes.number,
  isSelected: PropTypes.bool
}

export default Square
