import { Request, Response } from "express";
import { userCreateService } from "../../services/Users/userCreate.service";
import { instanceToPlain } from "class-transformer";

const userCreateController= async (req: Request, res: Response) => {
    const { full_name, username, email, password, isRestaurant,address_infoid,cartid,payment_infoid } = req.body;
    const newUser = await userCreateService({full_name, username, email, password, isRestaurant,address_infoid,cartid,payment_infoid })
    return res.status(201).json(instanceToPlain(newUser));
}

export{userCreateController}