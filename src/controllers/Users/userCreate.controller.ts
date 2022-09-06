import { Request, Response } from "express";
import { userCreateService } from "../../services/users/userCreate.service";
import { instanceToPlain } from "class-transformer";

const userCreateController= async (req: Request, res: Response) => {
    const { full_name, username, email, password, isRestaurant,address_info,payment_info } = req.body;
    const newUser = await userCreateService({full_name, username, email, password, isRestaurant,address_info,payment_info })
    return res.status(201).json(instanceToPlain(newUser));
}

export{userCreateController}