import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllHouses } from '../apis/regions'
import { useAuth0 } from '@auth0/auth0-react'

function AllSafehouses () {
  const [houses, setHouses] = useState([])
  const { isLoading, isAuthenticated, user } = useAuth0()

  useEffect(() => {
    getAllHouses()
      .then(results => {
        setHouses(results)
        return null
      })
      .catch(err => console.log(err))
  }, [])

  if (!isAuthenticated) {
    return <p>Unauthorised access</p>
  }

  if (isLoading) {
    return <img src="../../images/loading.gif"></img>
  }

  if (isAuthenticated && user) {
    return (
      <>
        <h1>All Safehouses</h1>
        {houses.map(house => {
          return <div key={house.name}>
            <Link to={`/house/${house.name}`}>
              <div className="text-center m-2 py-4 w-2/3 md:w-1/3 self-center bg-poroporo hover:bg-poroporo text-white text-lg rounded-lg focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
                {house.name}
              </div>
            </Link>
          </div>
        })}
      </>
    )
  }
}

export default AllSafehouses
