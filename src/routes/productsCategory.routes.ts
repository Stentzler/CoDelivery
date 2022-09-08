import { Router } from "express";

/*import { listTargetProductCategoryController } from "../controllers/productCategory/listTargetProductCategory.controller";*/
import { listProductCategoryController } from "../controllers/productCategory/listProductCategory.controller";

const productsCategory = Router();

productsCategory.get("/products_categories", listProductCategoryController);

productsCategory.get(
  "/products_categories/:id_category/products",
  /*listTargetProductCategoryController*/
);
