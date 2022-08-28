import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
  const hotel = new Hotel(req.body)

  try {
    const savedHotel = await hotel.save()
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
    res.json(hotel)
  } catch (error) {
    next(error)
  }
}

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find(req.query).limit(req.query?.limit || 20)
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
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}
