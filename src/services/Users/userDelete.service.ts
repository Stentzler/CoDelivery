import AppDataSource from '../../data-source';
import { Users } from '../../entities/user.entity';

const userDeleteService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  //  const userDelete = users.find((user) => user.id === id);
  const userDelete = await userRepository
    .createQueryBuilder('users')
    .where('users.id = :id', { id })
    .getOne();

  await userRepository.delete(userDelete!.id);

  return true;
};

export { userDeleteService };
