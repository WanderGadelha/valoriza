import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { classToPlain } from "class-transformer"



class ListUsersService {
    async execute() {
        const userRepositores = getCustomRepository(UsersRepositories)
        const users = await userRepositores.find()

        return classToPlain(users)
        
    }
}

export { ListUsersService }