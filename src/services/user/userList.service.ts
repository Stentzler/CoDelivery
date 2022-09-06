import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";

const userListService = async () : Promise<Users[]> => {

    const userRepository = AppDataSource.getRepository(Users)

    const users = await userRepository.find()

    return users
}

export {userListService}