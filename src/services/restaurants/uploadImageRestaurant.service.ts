import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { AppError } from '../../errors/AppError';
import { Restaurant } from '../../entities/restaurant.entity';
import { IImageRequest } from '../../interfaces/cloudinary';
import AppDataSource from '../../data-source';
const uploadImageRestaurantService = async (
  imageRequest: IImageRequest,
  id: string
) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  const restaurant = await restaurantRepository.findOne({ where: { id } });

  if (!restaurant) {
    throw new AppError('Restaurant not found', 404);
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
  await restaurantRepository.update(restaurant.id, {
    img_url: upload.secure_url,
  });

  return upload;
};

export { uploadImageRestaurantService };
