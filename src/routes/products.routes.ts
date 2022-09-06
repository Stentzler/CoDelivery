import { Router } from "express";
import { createProductController } from "../controllers/products/createProduct.controller";
import { deleteProductController } from "../controllers/products/deleteProduct.controller";
import { disableProductController } from "../controllers/products/disableProduct.controller";
import { listProductsController } from "../controllers/products/listProducts.controller";
import { updateProductController } from "../controllers/products/updateProduct.controller";
import { handleErrorMiddleware } from "../middlewares/handleError.middleware";
import { listProductsService } from "../services/product/listProducts.service";
import { updateProductService } from "../services/product/updateProduct.service";

const productsRoutes = Router();

//Listar todos os produtos -
productsRoutes.get("/restaurant/product", listProductsController);
//Cadastrar produto
productsRoutes.post("/restaurant/product", createProductController);
//Atualizar produto
productsRoutes.patch(
  "/restaurant/product/:id",

  updateProductController
);
//deletar produto
productsRoutes.delete(
  "/restaurant/product/:id",

  deleteProductController
);
// Desabilitar produto (SoftDelete)
productsRoutes.patch("/restaurant/product/:id", disableProductController);
