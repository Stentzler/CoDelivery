import { Router } from 'express';
import { createPaymentInfoController } from '../controllers/paymentInfo/createPaymentInfo.controller';
import { deletePaymentInfoController } from '../controllers/paymentInfo/deletePaymentInfo.controller';
import { listPaymentInfoController } from '../controllers/paymentInfo/listPaymentInfo.controller';
import { updatePaymentInfoController } from '../controllers/paymentInfo/updatePaymentInfo.controller';
import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { idVerifierMiddleware } from '../middlewares/idVerifier.middleware';
import { isUserMiddleware } from '../middlewares/isUser.middlewares';
import { schemaValidatedMiddleware } from '../middlewares/schemaValidated.middleware';
import { paymentInfoSchema } from '../schemas/paymentInfo/paymentInfoSchema';

const paymentInfoRoutes = Router();

paymentInfoRoutes.post(
  '/:id',
  schemaValidatedMiddleware(paymentInfoSchema),
  createPaymentInfoController
);
paymentInfoRoutes.get(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  listPaymentInfoController
);
paymentInfoRoutes.patch(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  updatePaymentInfoController
);
paymentInfoRoutes.delete(
  '/:id',
  authenticationMiddleware,
  isUserMiddleware,
  idVerifierMiddleware,
  deletePaymentInfoController
);

export default paymentInfoRoutes;
