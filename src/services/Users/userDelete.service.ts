import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";

const userDeleteService = async (id: string) => {
    const userRepository= AppDataSource.getRepository(Users)

    const users =await userRepository.find()

    const userDelet = users.find((user) => user.id === id);

    await userRepository.delete(userDelet!.id)
    return true 
}

export {userDeleteService}