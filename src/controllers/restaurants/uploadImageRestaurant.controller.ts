import { Request, Response } from "express";
import { IImageRequest } from "../../interfaces/cloudinary";
import { uploadImageRestaurantService } from "../../services/restaurants/uploadImageRestaurant.service";



const uploadImageRestaurantController = async (req: Request, res: Response) => {

const imageRequest=req.file as IImageRequest
const { id } = req.params;
 const imageSave= await uploadImageRestaurantService(imageRequest,id)


  return res.status(200).json({ message: "Upload succcessfully" }); 
};

export { uploadImageRestaurantController };
