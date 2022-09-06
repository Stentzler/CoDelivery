import { Request, Response } from "express";
import { userEditService } from "../../services/users/userEdit.service";



const userEditController= async (req: Request, res: Response) => {
   userEditService
}

export{userEditController}