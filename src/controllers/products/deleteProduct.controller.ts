import { Request, Response } from "express";
import { deleteProductService } from "../../services/product/deleteProduct.service";

const deleteProductController = async (
  request: Request,
  response: Response
) => {
  const id = request.params.id;
  const deletedProduct = await deleteProductService(id);
  return response.status(200).json({ message: "Product deleted successfully" });
};

export { deleteProductController };
