import AppDataSource from "../../data-source";
import { PaymentInfo } from "../../entities/paymentInfo.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deletePaymentInfoService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);
  const paymentRepository = AppDataSource.getRepository(PaymentInfo);
  const user = await userRepository.findOne({where:{id}});
 
  if(!user?.paymentInfo){
      throw new AppError("Payment Info not found",404)
    }
    if(user.paymentInfo.cpf===""||user.paymentInfo.expireDate===""||user.paymentInfo.cvvNo===""||user.paymentInfo.cardNo===""||user.paymentInfo.name===""){
        throw new AppError("Payment Info not found",404) 
    }
   

    await paymentRepository.update(user?.paymentInfo.id,{name:"",cardNo: "",cvvNo: "",expireDate: "",cpf: ""} ) 
 return true 
};

export { deletePaymentInfoService };
