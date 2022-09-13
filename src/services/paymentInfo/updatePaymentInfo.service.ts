import AppDataSource from "../../data-source";
import { PaymentInfo } from "../../entities/paymentInfo.entity";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const updatePaymentInfoService = async (id:string,data:any) => {
    const userRepository = AppDataSource.getRepository(Users);
    const paymentRepository = AppDataSource.getRepository(PaymentInfo);
    const user = await userRepository.findOne({where:{id}});
   
    if(!user?.paymentInfo){
        throw new AppError("Payment Info not found",404)
      }
      if(user.paymentInfo.cpf===""||user.paymentInfo.expireDate===""||user.paymentInfo.cvvNo===""||user.paymentInfo.cardNo===""||user.paymentInfo.name===""){
          throw new AppError("Payment Info not found",404) 
      }
     
   if(data.id){
    throw new AppError('Those changes are not allowed', 403);
   }
try {
    await paymentRepository.update(user?.paymentInfo.id,{...user.paymentInfo,...data} ) 
   return true 
    
} catch (error) {
    throw new AppError('Request has invalid properties', 422);
}
}

export{updatePaymentInfoService}