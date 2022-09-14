import { Response, Request } from 'express';
import { userActiveService } from '../../services/users/userActive.service';
const userActiveController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const activeUser = await userActiveService(id);
  return res.status(200).json({ message: 'Usuário verificado com sucesso ' });
};

export { userActiveController };
