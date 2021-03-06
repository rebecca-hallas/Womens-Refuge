import React from 'react'
import { Link } from 'react-router-dom'

function ViewAllButton () {
  return (
    <div>
      <Link to='/houses'>
        <button className="py-2 self-center bg-poroporo hover:bg-poroporo text-white w-16 text-xs rounded-lg focus:ring transform transition hover:scale-105 duration-300 ease-in-out">View All</button>
      </Link>
    </div>
  )
}

export default ViewAllButton
