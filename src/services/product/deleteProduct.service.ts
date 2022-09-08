import { AppError } from "../../errors/AppError";
import { productRepository } from "./repositories";

const deleteProductService = async (id: string, isRestaurant: boolean) => {
  const findProduct = await productRepository.findOneBy({ id: id });
  if (!findProduct) {
    throw new AppError("Product not find");
  }
  if (!isRestaurant) {
    throw new AppError("This product does not belong to this restaurant", 403);
  }
  const deletedProduct = productRepository
    .createQueryBuilder()
    .delete()
    .where({ id: id })
    .execute();
  return deletedProduct;
};

export { deleteProductService };
