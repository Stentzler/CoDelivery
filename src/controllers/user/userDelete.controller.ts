import { Request, Response } from "express";
import { userDeleteService } from "../../services/user/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {

    const { id } = req.params

    await userDeleteService(id)

    return res.status(204).json({message: "User updated successfully"})    
    
}

export { userDeleteController }