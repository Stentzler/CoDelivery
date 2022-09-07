import { Request, Response } from "express";
import { userListService } from "../../services/Users/userList.service";

const userListController = async (req: Request, res: Response) => {
  
  const {id}= req.params  
   
  const user = await userListService(id);

  return res.status(200).json(user);
};

export { userListController };
