import { Request, Response } from 'express';
import { userSoftDeleteService } from '../../services/users/userSoftDelete.service';

const userSoftDeleteController = async (req: Request, res: Response) => {
  const { id } = req.user;

  await userSoftDeleteService(id);

  return res.status(204).json({ message: 'User deactivated successfully' });
};

export { userSoftDeleteController };
