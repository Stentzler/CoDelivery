import AppDataSource from "../../data-source";
import bcrypt from "bcrypt";
import { AddressInfo } from "../../entities/addressInfo.entity";
import { Cart } from "../../entities/cart.entity";
import { PaymentInfo } from "../../entities/paymentInfo.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";

const userCreateService = async ({
  full_name,
  username,
  email,
  password,
  isRestaurant,
  address_info,
  payment_info,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addresRepository = AppDataSource.getRepository(AddressInfo);
  const cartRepository = AppDataSource.getRepository(Cart);
  const paymentRepository = AppDataSource.getRepository(PaymentInfo);

  const usersList = await userRepository.find();

  const emailExist = usersList.find((user) => user.email === email);

  if (emailExist) {
    throw new AppError("Email alredy exist ", 400);
  }

  const newAddress = new AddressInfo();
  newAddress.address = address_info.address;
  newAddress.number = address_info.number;
  newAddress.zipCode = address_info.zipCode;
  newAddress.city = address_info.city;
  newAddress.state = address_info.state;
  newAddress.complement = address_info.complement|| "Not specified";

  addresRepository.create(newAddress);

  await addresRepository.save(newAddress);

  const newPayment = new PaymentInfo();
  newPayment.Name = payment_info.name;
  newPayment.cardNo = payment_info.cardNo;
  newPayment.cvvNo = payment_info.cvvNo;
  newPayment.expireDate = payment_info.expireDate;
  newPayment.cpf = payment_info.cpf;

  paymentRepository.create(newPayment);
  await paymentRepository.save(newPayment);

  const newCart = new Cart();
  newCart.price = 0;
  cartRepository.create(newCart);
  await cartRepository.save(newCart);

  const newUser = new Users();
  newUser.fullName = full_name;
  newUser.userName = username;
  newUser.email = email;
  newUser.password = bcrypt.hashSync(password, 10);
  newUser.isRestaurant = isRestaurant;
  newUser.addressInfo = newAddress;
  newUser.cart = newCart;
  newUser.paymentInfo = newPayment;

  userRepository.create(newUser);

  await userRepository.save(newUser);

  return newUser;
};

export { userCreateService };
