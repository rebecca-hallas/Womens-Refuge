import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getHousesInRegion } from '../apis/regions'
import { useAuth0 } from '@auth0/auth0-react'

function Region () {
  const [houses, setHouses] = useState(null)
  const regionName = useParams().name
  const { isLoading, isAuthenticated, user } = useAuth0()

  useEffect(() => {
    return getHousesInRegion(regionName)
      .then(houses => {
        setHouses(houses)
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
        {houses && houses.map(house => {
          return <div key={house.house_id}><Link to={`/house/${house.name}`} >
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

export default Region
