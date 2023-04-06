import Model from './Model'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

const SALT_ROUNDS = 13

export interface IUser {
  dataVersion: 1,
  username: string
  email: string
  passwordDigest: string
  nickname: string
  rating: number
}

export class User extends Model<IUser> {

    public static build(username: string, email: string, nickname: string, password: string): User {
        const initialData: IUser = {
            dataVersion: 1,
            username,
            email,
            passwordDigest: ''
            nickname,
            rating: 0
        }

        const result = new User(initialData, v4())
        result.setPassword(password)
        return result
    }

    public static async create(username: string, email: string, nickname: string, password: string): Promise<User> {
        const user = User.build(username, email, nickname, password)
        await user.save()
        return user
    }

    setPassword(password: string) {
        this.data.passwordDigest = bcrypt.hashSync(password, SALT_ROUNDS)
    }

    checkPassword(password: string) {
        return bcrypt.compareSync(password, this.data.passwordDigest)
    }
}