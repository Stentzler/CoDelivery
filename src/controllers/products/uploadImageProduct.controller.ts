import { Request, Response } from 'express';
import { IImageRequest } from '../../interfaces/cloudinary';
import { uploadImageProductService } from '../../services/product/uploadImageProduct.service';

const uploadImageProductController = async (req: Request, res: Response) => {
  const imageRequest = req.file as IImageRequest;
  const { id } = req.params;
  const restarauntId = req.user.id;
  const imageSave = await uploadImageProductService(
    imageRequest,
    id,
    restarauntId
  );
  return res
    .status(200)
    .json({ message: 'Image has been uploaded succcessfully' });
};
export { uploadImageProductController };
