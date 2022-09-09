import AppDataSource from '../../data-source';
import { PaymentInfo } from '../../entities/paymentInfo.entity';
import { Users } from '../../entities/user.entity';
import { UserAddress } from '../../entities/userAddresses.entity';
import { AppError } from '../../errors/AppError';

const userEditService = async (id: string, data: any) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(UserAddress);
  const paymentRepository = AppDataSource.getRepository(PaymentInfo);

  // const user = await userRepository.findOne({ where: { id } });
  const user = await userRepository
    .createQueryBuilder('users')
    .where('users.id = :id', { id })
    .getOne();

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
    data.address?.id ||
    data.cart?.id ||
    data.paymentInfo?.id ||
    data.cart?.price
  ) {
    throw new AppError('Those changes are not allowed', 403);
  }

  if (data.paymentInfo?.cpf) {
    const cpfChecker = await paymentRepository.findOne({
      where: { cpf: data.paymentInfo.cpf },
    });

    if (cpfChecker) {
      throw new AppError('Given CPF is already being used', 409);
    }
  }

  try {
    if (data.address) {
      if (data.address.length === 1) {
        const addresses = await addressRepository.find();
        const updatedAddress = addresses.find(
          (address) => address.id === user.address[0].id
        );
        await addressRepository.update(user.address[0].id, {
          ...user.address[0],
          ...data.addressInfo,
        });
        delete data.addressInfo;
      }
    }

    if (data.paymentInfo) {
      const payment = await paymentRepository.find();

      const updatedPayment = payment.find(
        (payment) => payment.id === user.paymentInfo.id
      );
      await paymentRepository.update(user.paymentInfo.id, {
        ...user.paymentInfo,
        ...data.paymentInfo,
      });
      delete data.paymentInfo;
    }

    data.updatedAt = new Date();

    await userRepository.update(user.id, { ...user, ...data });

    return true;
  } catch (error) {
    throw new AppError('Request has invalid properties', 422);
  }
};

export { userEditService };
