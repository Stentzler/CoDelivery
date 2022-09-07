import AppDataSource from "../../data-source";
import { AddressInfo } from "../../entities/addressInfo.entity";
import { PaymentInfo } from "../../entities/paymentInfo.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const userEditService = async (id: string, data: any) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(AddressInfo);
  const paymentRepository=AppDataSource.getRepository(PaymentInfo)

  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (typeof data !== "object") {
    throw new AppError("Request format is not an object", 400);
  }
  if (
    data.id ||
    data.created_at ||
    data.updated_at ||
    data.isRestaurant ||
    data.isActive ||
    data.addressInfo?.id ||
    data.cart?.id ||
    data.paymentInfo?.id ||
    data.cart?.price

  ) {
    throw new AppError("Those changes are not allowed", 403);
  }

  if (data.paymentInfo.cpf) {
    const cpfChecker = await paymentRepository.findOne({
      where: { cpf: data.paymentInfo.cpf },
    });

    if (cpfChecker) {
      console.log(cpfChecker);
      throw new AppError("Given CPF is already being used", 409);
    }
  }


  try {

    if (data.addressInfo) {
      const address = await addressRepository.find();

      const updatedAddress = address.find(
        (address) => address.id === user.addressInfo.id
      );
      await addressRepository.update(user.addressInfo.id, {
        ...user.addressInfo,
        ...data.addressInfo,
      });
      delete data.addressInfo;
    }

    if(data.paymentInfo) {
      const payment = await paymentRepository.find()

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
    throw new AppError("Request has invalid properties", 422);
  }
};

export { userEditService };
