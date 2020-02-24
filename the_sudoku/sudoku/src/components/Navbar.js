import React from 'react'

// Navigation bar
export const Navbar = () => {
  return (
    <header
      className="flex items-center px-4 py-3 bg-gray-300
      shadow"
    >
      <img className="h-8" src="/static/the_sudoku/img/logo.svg" alt="logo" />
      <div className="ml-2 font-medium text-xl text-blue-800">Sudoku</div>
    </header>
  )
}

export default Navbar
