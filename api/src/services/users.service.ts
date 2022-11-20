import { hash } from 'bcrypt'
import { CreateUserDto } from '../dtos/users.dto'
import { HttpException } from '../exceptions/HttpException'
import { User } from '../interfaces/users.interface'
import reservationModel from '../models/reservatons.model'
import userModel from '../models/users.model'
import { isEmpty } from '../utils/util'

class UserService {
  public async findUsers(): Promise<User[]> {
    const users: User[] = await userModel.find().select('-password')

    return users
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty')

    const findUser: User | null = await userModel.findOne({ _id: userId }).select('-password')
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    return findUser
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUserWithUsername: User | null = await userModel.findOne({
      username: userData.username,
    })
    if (findUserWithUsername)
      throw new HttpException(409, `This username ${userData.username} already exists`)

    const findUserWithEmail: User | null = await userModel.findOne({ email: userData.email })
    if (findUserWithEmail)
      throw new HttpException(409, `This email ${userData.email} already exists`)

    const hashedPassword = await hash(userData.password, 10)
    const createUserData: User = await userModel.create({ ...userData, password: hashedPassword })

    return createUserData
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    if (userData.username) {
      const findUser: User | null = await userModel.findOne({ username: userData.username })
      if (findUser && findUser._id != userId)
        throw new HttpException(409, `This username ${userData.username} already exists`)
    }

    if (userData.email) {
      const findUser: User | null = await userModel.findOne({ email: userData.email })
      if (findUser && findUser._id != userId)
        throw new HttpException(409, `This email ${userData.email} already exists`)
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10)
      userData = { ...userData, password: hashedPassword }
    }

    const updateUserById: User | null = await userModel.findByIdAndUpdate(userId, userData, {
      new: true,
    })
    if (!updateUserById) throw new HttpException(400, "User doesn't exist")

    return updateUserById
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User | null = await userModel.findByIdAndDelete(userId)
    if (!deleteUserById) throw new HttpException(400, "User doesn't exist")

    // Deleting related reservations
    await reservationModel.deleteMany({ user: deleteUserById._id })

    return deleteUserById
  }

  public async countUsers(): Promise<number> {
    const count = await userModel.countDocuments()

    return count
  }
}

export default UserService
