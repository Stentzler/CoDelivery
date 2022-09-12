import AppDataSource from '../../data-source';
import bcrypt from 'bcrypt';
import { Users } from '../../entities/user.entity';

import { AppError } from '../../errors/AppError';

const userEditService = async (id: string, data: any) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({ where: { id } });
  const userList = await userRepository.find();

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (typeof data !== 'object') {
    throw new AppError('Request format is not an object', 400);
  }
  if (
    data.id ||
    data.createdAt ||
    data.updatedAt ||
    data.isRestaurant ||
    data.isActive ||
    data.cart
  ) {
    throw new AppError('Those changes are not allowed', 403);
  }

  if(data.email){
  const userEmailInUse= userList.find((user)=>user.email===data.email)
  if(userEmailInUse){
    throw new AppError('Email already in use', 400);
  }
  }
  try {

    if(data.password){
   data.password=bcrypt.hashSync(data.password , 10);
    }
   
    data.updatedAt = new Date();

    await userRepository.update(user.id, { ...user, ...data });

    return true;
  } catch (error) {

    throw new AppError('Request has invalid properties', 422);
    
  }
};

export { userEditService };
