import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ISessionLogin } from "../../interfaces/session";

const userLoginService = async ({ email, password }: ISessionLogin) => {
  const userRepository = AppDataSource.getRepository(Users);
  const usersList = await userRepository.find();
  const user = usersList.find((user) => user.email === email);

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }
  if (user.isActive === false) {
    throw new AppError("User is not active", 403);
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    { id: user.id, isRestaurant: user.isRestaurant },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  return { token: token };
};

export { userLoginService };
