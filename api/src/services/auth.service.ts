import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { CreateUserDto } from '../dtos/users.dto'
import { HttpException } from '../exceptions/HttpException'
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface'
import { User } from '../interfaces/users.interface'
import userModel from '../models/users.model'
import { isEmpty } from '../utils/util'

class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUserWithUsername: User | null = await userModel.findOne({
      username: userData.username,
    })
    if (findUserWithUsername) throw new HttpException(409, `Username is taken. Try another`)

    const findUserWithEmail: User | null = await userModel.findOne({ email: userData.email })
    if (findUserWithEmail) throw new HttpException(409, `Email already exists`)

    const hashedPassword = await hash(userData.password, 10)
    const createUserData: User = await userModel.create({ ...userData, password: hashedPassword })

    return createUserData
  }

  public async login(userData: CreateUserDto): Promise<{ tokenData: TokenData; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUser: User | null = await userModel
      .findOne({ username: userData.username })
      .select('+password')
    if (!findUser) throw new HttpException(401, 'Invalid username and/or password')

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(401, 'Invalid username and/or password')

    const tokenData = this.createToken(findUser)

    return { tokenData, findUser }
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty')

    const findUser: User | null = await userModel.findOne({
      email: userData.email,
      password: userData.password,
    })
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`)

    return findUser
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id }
    const secretKey = JWT_SECRET as string
    const expiresIn: number = 60 * 60

    return { expiresIn, token: sign(dataStoredInToken, secretKey) } // add expiresIn
  }
}

export default AuthService
