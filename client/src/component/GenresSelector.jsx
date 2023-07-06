import React from 'react'
import { ImTree } from 'react-icons/im'

function GenresSelector({ onClick ,badge}) {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-dark-subtle  translate-x-2 -translate-y-1 text-xs bg-light-subtle rounded-full absolute top-0 right-0 w-5  h-5 justify-center flex items-center text-white">
        {badge >= 9 ? "9+" : badge}
      </span>
    );
  }
  return (
      <button type='button' onClick={onClick} className='relative flex items-center space-x-2 py-1 px-3 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition  dark:text-dark-subtle text-light-subtle hover:text-primary dark:text-white rounded '>
          <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
      </button>
  )
}

export default GenresSelector
