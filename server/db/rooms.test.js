const config = require('./knexfile').test
const knex = require('knex')
const testDb = knex(config)

const roomDb = require('./rooms')

beforeAll(() => {
  return testDb.migrate.latest({ directory: './server/db/migrations' })
})

beforeEach(() => {
  return testDb.seed.run({ directory: './server/db/testseeds' })
})

test('getRoomById should return room with that id', () => {
    const id = 4
    return roomDb.getRoomById(id, testDb)
      .then(room => {
        expect(room[0].house_id).toBe(2)
        expect(room).toHaveLength(1)
        return null
      })
  })

test('getRoomsbyHouseId should return rooms corresponding to house id', () => {
    const house_id = 7
    return roomDb.getRoomsByHouseId(house_id, testDb)
      .then(room => {
          expect(room[0].id).toBe(12)
          expect(room).toHaveLength(4)
      })
})

test('getRoomsbyHouse should return rooms corresponding to house name', () => {
    const house_id = 7
    return roomDb.getRoomsByHouse(house_name, testDb)
      .then(room => {
          expect(room[0].id).toBe(12)
          expect(room).toHaveLength(4)
          return null
      })
})

test('addRoom should add a room', () => {
    const room = { id: 666, house_id: 667, description: 'new room yo', available: 0 }
    return roomDb.addRooms(room, testDb)
      .then(ids => {
        expect(ids).toHaveLength(1)
        expect(typeof ids[0]).toBe('number')
        return null
      })
  })

  test('deleteRoom should delete room with that id', () => {
    const id = 4
    return roomDb.deleteRoom(id, testDb)
      .then(room => {
        expect(room.name).toBe(undefined)
        return null
      })
  })

//   test('updateRoomDescription should return updated room description', () => {
//     const id = 5
//     return roomDb.updateRoomDescription(id, 'new test descripsdfdhtion', testDb)
//     .then(()=>{
//         return roomDb.getRoomById(id)
        
//     })
//     .then(room => {
//         console.log('room',room)
//         expect(room.description).toMatch('new test descriptions')
//     })
//     .catch(err => console.log(err))
//   })

  test('updateRoomDescription', () => {
          const updateRoomDescription = {
        id: 1,
        house_id: 1,
        description: 'Leshgoooooo!',
        available: 0
      }
  
      return roomDb.updateRoomDescription(updateRoomDescription, testDb)
        .then(room => {
          expect(room[0].id).toBe(1)
          expect(room[0].house_id).toBe(1)
          expect(room[0].description).toBe('Leshgoooooo!')
          expect(room[0].available).toBe(1)
          return null
        })
    })
  
  