import AppDataSource from '../../data-source';
import bcrypt from 'bcrypt';
import { Cart } from '../../entities/cart.entity';
import { PaymentInfo } from '../../entities/paymentInfo.entity';
import { AppError } from '../../errors/AppError';
import { IUserRequest } from '../../interfaces/users';
import { Users } from '../../entities/user.entity';
import { UserAddress } from '../../entities/userAddresses.entity';

const userCreateService = async ({
  fullName,
  userName,
  email,
  password,
  address,
  paymentInfo,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(UserAddress);
  const cartRepository = AppDataSource.getRepository(Cart);
  const paymentRepository = AppDataSource.getRepository(PaymentInfo);

  // const emailExists = await userRepository.findOne({ where: { email } });
  const emailExists = await userRepository
    .createQueryBuilder('users')
    .where('users.email = :email', { email })
    .getOne();

  if (emailExists) {
    throw new AppError('Email already exists', 400);
  }

  const newAddress = new UserAddress();
  newAddress.street =  address.street;
  newAddress.number =  address.number;
  newAddress.zipCode =  address.zipCode;
  newAddress.city = address.city;
  newAddress.state =  address.state;
  newAddress.complement =  address.complement || 'Not specified';

  addressRepository.create(newAddress);

  await addressRepository.save(newAddress);

  const newPayment = new PaymentInfo();
  newPayment.name = paymentInfo.name;
  newPayment.cardNo = paymentInfo.cardNo;
  newPayment.cvvNo = paymentInfo.cvvNo;
  newPayment.expireDate = paymentInfo.expireDate;
  newPayment.cpf = paymentInfo.cpf;

  paymentRepository.create(newPayment);
  await paymentRepository.save(newPayment);

  const newCart = new Cart();
  newCart.subtotal = 0;
  cartRepository.create(newCart);
  await cartRepository.save(newCart);

  const newUser = new Users();
  newUser.fullName = fullName;
  newUser.userName = userName;
  newUser.email = email;
  newUser.password = bcrypt.hashSync(password, 10);
  newUser.cart = newCart;
  newUser.address = [newAddress];
  newUser.paymentInfo = newPayment;

  userRepository.create(newUser);

  await userRepository.save(newUser);

  return newUser;
};

export { userCreateService };
