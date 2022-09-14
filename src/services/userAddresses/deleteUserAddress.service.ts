import AppDataSource from '../../data-source';
import { Users } from '../../entities/user.entity';
import { UserAddress } from '../../entities/userAddresses.entity';
import { AppError } from '../../errors/AppError';

const deleteUserAddressService = async (userId: string, addressId: string) => {
  const usersRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(UserAddress);

  const user = await usersRepository.findOne({
    where: { id: userId },
    relations: { address: true },
  });

  const addressExists = await addressRepository.findOne({
    where: { id: addressId },
  });

  if (!addressExists) {
    throw new AppError('Address does not exist', 404);
  }

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const addressToDelete = user.address.find(
    (address) => address.id === addressId
  );

  if (!addressToDelete) {
    throw new AppError('This address does not belong to this user', 409);
  }

  await addressRepository.delete({ id: addressId });

  return;
};

export { deleteUserAddressService };
