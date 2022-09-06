import { AppError } from "../../errors/AppError";
import { productRepository } from "./productRepository";

const disableProductService = async (id: string) => {
  const findProduct = await productRepository.findOneBy({ id });
  if (!findProduct) {
    throw new AppError("Product not find");
  }
  const disableProduct = await productRepository.update(id, {
    isActive: false,
  });
};
export { disableProductService };
