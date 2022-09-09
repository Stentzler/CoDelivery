import { ISessionLogin } from "../../interfaces/session";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Restaurant } from "../../entities/restaurant.entity";

const restaurantLoginService = async ({ email, password }: ISessionLogin) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  const restaurantList = await restaurantRepository.find();

  const restaurant = restaurantList.find(
    (restaurant) => restaurant.email === email
  );

  if (!restaurant) {
    throw new AppError("Invalid email or password", 403);
  }
  if (restaurant.isActive === false) {
    throw new AppError("Restaurant is not active", 403);
  }

  const passwordMatch = bcrypt.compareSync(password, restaurant.password);
  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    { id: restaurant.id, isRestaurant: restaurant.isRestaurant },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  return { token: token };
};

export { restaurantLoginService };
