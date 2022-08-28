import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'

export const createRoom = async (req, res, next) => {
  const room = new Room(req.body)

  try {
    const savedRoom = await room.save()

    try {
      await Hotel.findByIdAndUpdate(req.body.hotelId, { $push: { rooms: savedRoom._id } })
    } catch (error) {
      return next(error)
    }

    res.json(savedRoom)
  } catch (error) {
    next(error)
  }
}

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.json(updatedRoom)
  } catch (error) {
    next(error)
  }
}

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id)

    try {
      await Hotel.findOneAndUpdate({ rooms: req.params.id }, { $pull: { rooms: req.params.id } })
    } catch (error) {
      return next(error)
    }

    res.json({ message: 'Room has been deleted' })
  } catch (error) {
    next(error)
  }
}

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
    res.json(room)
  } catch (error) {
    next(error)
  }
}

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find()
    res.json(rooms)
  } catch (error) {
    next(error)
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    )
    res.status(200).json('Room status has been updated.')
  } catch (err) {
    next(err)
  }
}
