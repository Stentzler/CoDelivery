import { userLoginService } from "../../services/session/userLogin.service";
import { Request, Response } from "express";

const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loggedUser = await userLoginService({ email, password });
  return res.status(200).json(loggedUser);
};

export { userLoginController };
