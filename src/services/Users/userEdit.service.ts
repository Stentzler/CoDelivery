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
    data.isActive ||
    data.address_info?.id ||
    data.cart ||
    data.payment_info?.id
  ) {
    throw new AppError("Those changes are not allowed", 403);
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
    }

    if(data.paymentInfo){
    const payment=await paymentRepository.find()

    const updatedPayment=payment.find((payment)=>payment.id===user.paymentInfo.id)
    await paymentRepository.update(user.paymentInfo.id,{...user.paymentInfo,...data.paymentInfo})
    }

    data.updatedAt = new Date();
    delete data.addressInfo;
    delete data.paymentInfo;
    await userRepository.update(user.id, { ...user, ...data });

    return true;
  } catch (error) {
    console.log(error);
    throw new AppError("Request has invalid properties", 422);
  }
};

export { userEditService };
