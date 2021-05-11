import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAllHouses } from '../apis/regions'
import { useAuth0 } from '@auth0/auth0-react'
import houseFormatter from './formatter'

function AllSafehouses () {
  const [houses, setHouses] = useState([])
  const { isLoading, isAuthenticated, user } = useAuth0()
  const history = useHistory()

  useEffect(() => {
    getAllHouses()
      .then(results => {
        setHouses(houseFormatter(results))
        return null
      })
      .catch(err => console.log(err))
  }, [])

  if (!isAuthenticated) {
    return <p>Unauthorised access</p>
  }

  if (isLoading) {
    return <img src="/images/loading.gif"></img>
  }

  if (isAuthenticated && user) {
    return (
      <>
        <h1 className='text-center my-8 mt-20 font-extrabold text-4xl'>All Safehouses</h1>

        {houses.map(island => {
          return (
            <div className='flex flex-col justify-center w-full' key={island.island}>
              <p className="mt-16 p-8 pb-0 text-center font-extrabold text-3xl">{island.island === 'north' ? 'North Island' : 'South Island'}</p>
              {island.regions.map(region => {
                return (
                  <div key={region.name}>
                    <p className="pb-4 mt-12 text-center font-bold text-2xl">{region.name}</p>
                    {region.houses.map(house => {
                      return (
                        <div key={house.name} className=' flex justify-center '>
                          <button onClick={() => { history.push(`/house/${house.name}`) }} className="px-5 flex justify-between items-center text-center m-2 py-4 w-2/3 md:w-1/3 self-center bg-poroporo hover:bg-poroporo text-white text-lg rounded-lg focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
                            <p className="w-8"></p>{house.name} <img src={house.available_rooms > 0 ? '/images/tickWhite.png' : '/images/crossWhite.png'} className="w-6 md:w-8" alt="" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>)
        })}
      </>
    )
  }
}

export default AllSafehouses
