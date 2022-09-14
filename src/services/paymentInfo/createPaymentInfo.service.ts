import AppDataSource from '../../data-source';
import { PaymentInfo } from '../../entities/paymentInfo.entity';
import { Users } from '../../entities/user.entity';
import { AppError } from '../../errors/AppError';
import { IPaymentInfoRequest } from '../../interfaces/paymentInfo';

const createPaymentInfoService = async ({
  id,
  name,
  cardNo,
  cvvNo,
  expireDate,
  cpf,
}: IPaymentInfoRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const paymentRepository = AppDataSource.getRepository(PaymentInfo);

  const cpfExists = await paymentRepository.findOne({ where: { cpf } });
  const idValid = await userRepository.findOne({
    where: { id: id },
    relations: { paymentInfo: true },
  });

  if (!idValid) {
    throw new AppError('User not found', 404);
  }

  if (idValid.paymentInfo !== null) {
    if (
      idValid.paymentInfo?.cpf !== '' ||
      idValid.paymentInfo?.expireDate !== '' ||
      idValid.paymentInfo?.cvvNo !== '' ||
      idValid.paymentInfo?.cardNo !== '' ||
      idValid.paymentInfo?.name !== ''
    ) {
      throw new AppError(
        'You already have a payment method, you can edit or delete it and create a new one',
        409
      );
    }
  }

  if (cpfExists) {
    throw new AppError('CPF is already being used', 409);
  }
  const newPayment = new PaymentInfo();
  newPayment.name = name;
  newPayment.cardNo = cardNo;
  newPayment.cvvNo = cvvNo;
  newPayment.expireDate = expireDate;
  newPayment.cpf = cpf;

  paymentRepository.create(newPayment);
  await paymentRepository.save(newPayment);

  await userRepository.update(id, { paymentInfo: newPayment });
  return true;
};

export { createPaymentInfoService };
