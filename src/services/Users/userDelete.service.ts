import AppDataSource from '../../data-source';
import { Users } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);
 const users=await userRepository.find()
    const userDelete = users.find((user) => user.id === id);
  
    if(!userDelete){
      throw new AppError("User not found",404)
    }

  await userRepository.delete(userDelete!.id);

  return true;
};

export { userDeleteService };
