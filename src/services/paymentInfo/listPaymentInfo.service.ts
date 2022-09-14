import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const listPaymentInfoService = async (id:string) => {
    const userRepository = AppDataSource.getRepository(Users);
    const user = await userRepository.findOne({where: {id}, relations:{paymentInfo:true} })

 
    if (!user) {
		throw new AppError('User not found', 404);
	}
    if(!user.paymentInfo){
        throw new AppError('Payment info not found', 404);
    }

    if(user.paymentInfo.cpf===""||user.paymentInfo.expireDate===""||user.paymentInfo.cvvNo===""||user.paymentInfo.cardNo===""||user.paymentInfo.name===""){
        throw new AppError("Payment Info not found",404) 
    }

	return user.paymentInfo
}

export {listPaymentInfoService}