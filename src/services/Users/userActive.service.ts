import AppDataSource from '../../data-source';
import { Users } from '../../entities/user.entity';

const userActiveService = async (id: string) => {
  const userRepository = await AppDataSource.getRepository(Users);
  const activeUser = await userRepository.update(id, { isActive: true });
  return activeUser;
};

export { userActiveService };
