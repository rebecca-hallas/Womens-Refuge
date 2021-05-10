import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AddHouseButton () {
  const ourUser = useSelector(state => state.user)

  return (
    <>
      {ourUser?.isMasterAdmin
        ? <Link to='/houses/add'>
          <button className="py-2 self-center bg-poroporo hover:bg-poroporo text-white w-20 text-xs rounded-lg focus:ring transform transition hover:scale-105 duration-300 ease-in-out">Add Whare</button>
        </Link>
        : null
      }
    </>
  )
}