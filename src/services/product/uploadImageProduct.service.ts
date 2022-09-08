import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { AppError } from '../../errors/AppError';
import { IImageRequest } from '../../interfaces/cloudinary';
import { productRepository, restaurantRepository } from './repositories';
const uploadImageProductService = async (
  imageRequest: IImageRequest,
  id: string,
  restarauntId: string
) => {
  const restaurantVerify = await restaurantRepository.findOneBy({
    id: restarauntId,
  });
  if (!restaurantVerify) {
    throw new AppError('Restaurant not exist ', 404);
  }

  const [product] = await productRepository.find({
    relations: { restaurant: true },
    where: { id: id },
  });
  if (restarauntId !== product?.restaurant.id) {
    throw new AppError('This product does not belong to this restaurant ', 401);
  }
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  const upload = await cloudinary.uploader.upload(
    imageRequest!.path,
    (error: Error, result: any) => result
  );

  fs.unlink(imageRequest!.path, (error) => {
    if (error) {
      throw new AppError(error.message, 404);
    }
  });
  await productRepository.update(product.id, {
    img_url: upload.secure_url,
  });

  return upload;
};

export { uploadImageProductService };
