import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
  const roomsPayload = req.body.rooms.map((room) => ({
    ...room,
    roomNumbers: room.roomNumbers.map((roomNumber) => ({ number: roomNumber })),
  }))

  const roomIds = []
  try {
    const savedRooms = await Room.insertMany(roomsPayload)
    roomIds = savedRooms.map((room) => room._id)
  } catch (error) {
    return next(error)
  }

  const hotelPayload = { ...req.body, rooms: roomIds }

  try {
    const savedHotel = await Hotel.create(hotelPayload)
    res.json(savedHotel)
  } catch (error) {
    next(error)
  }
}

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.json(updatedHotel)
  } catch (error) {
    next(error)
  }
}

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    res.json({ message: 'Hotel has been deleted' })
  } catch (error) {
    next(error)
  }
}

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const rooms = await Room.find({ _id: { $in: hotel.rooms } })
    res.json({ ...hotel._doc, rooms })
  } catch (error) {
    next(error)
  }
}

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(req.query)
    res.json(hotels)
  } catch (error) {
    next(error)
  }
}

export const countByCities = async (req, res, next) => {
  const cities = req.query.cities.split(',')
  try {
    const hotels = await Promise.all(
      cities.map(async (city) => {
        return { city, count: await Hotel.countDocuments({ city }) }
      })
    )
    res.json(hotels)
  } catch (error) {
    next(error)
  }
}

export const countByPropertyTypes = async (req, res, next) => {
  const types = req.query.types.split(',')
  try {
    const hotels = await Promise.all(
      types.map(async (type) => {
        return { type, count: await Hotel.countDocuments({ type }) }
      })
    )
    res.json(hotels)
  } catch (error) {
    next(error)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const rooms = await Room.find({ _id: { $in: hotel._doc.rooms } })
    res.json(rooms)
  } catch (err) {
    next(err)
  }
}
