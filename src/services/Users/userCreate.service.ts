import AppDataSource from '../../data-source';
import bcrypt from 'bcrypt';
import { Cart } from '../../entities/cart.entity';
import { AppError } from '../../errors/AppError';
import { IUserRequest } from '../../interfaces/users';
import { Users } from '../../entities/user.entity';
import { sendEmail } from '../../utils/nodemailer.util';

const userCreateService = async ({
  fullName,
  userName,
  email,
  password,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const cartRepository = AppDataSource.getRepository(Cart);

  const emailExists = await userRepository.findOne({ where: { email } });

  if (emailExists) {
    throw new AppError('Email already exists', 400);
  }

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

  userRepository.create(newUser);

  await userRepository.save(newUser);
  console.log(newUser);
  await sendEmail({
    subject: 'Teste',
    text: `Confirme sua conta`,
    to: newUser.email,
    html: `<a>localhost:3001/users/${newUser.id}</a>`,
  });
  return newUser;
};

export { userCreateService };
