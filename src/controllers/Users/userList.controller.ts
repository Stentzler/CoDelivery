import { Request, Response } from "express";
import { userListService } from "../../services/users/userList.service";

const useListController = async (req: Request, res: Response   ) => {

    const users = await userListService()

    return res.status(200).json(users)
}

export { useListController }