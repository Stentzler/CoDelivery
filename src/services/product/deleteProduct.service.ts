import { AppError } from "../../errors/AppError";
import { productRepository } from "./productRepository";

const deleteProductService = async (id: string) => {
  const findProduct = await productRepository.findOneBy({ id });
  if (!findProduct) {
    throw new AppError("Product not find");
  }

  const deletedProduct = await productRepository.delete({ where: { id: id } });
  return deletedProduct;
};

export { deleteProductService };
