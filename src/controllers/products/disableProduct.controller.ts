import { Request, Response } from "express";
import { disableProductService } from "../../services/product/disableProduct.service";

const disableProductController = (request: Request, response: Response) => {
  const id = request.params.id;
  const disableProduct = disableProductService(id);
  return response
    .status(200)
    .json({ message: "Products disable  uccessfully" });
};
export { disableProductController };
