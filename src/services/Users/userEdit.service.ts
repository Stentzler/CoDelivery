import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const userEditService = async (id: string, data: any) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  if (typeof data !== "object") {
    throw new AppError("Request format is not an object", 400);
  }
  if (
    data.id ||
    data.created_at ||
    data.updated_at ||
    data.isRestaurant ||
    data.isActive||
    data.address_info.id||
    data.cart.id||
    data.payment_info.id||
    data.cart.price
  ) {
    throw new AppError("Those changes are not allowed", 403);
  }
  try {
    data.updated_at = new Date();
    await userRepository.update(user.id, { ...user, ...data });

    return true;
  } catch (error) {
    throw new AppError("Request has invalid properties", 422);
  }
};

export { userEditService };
