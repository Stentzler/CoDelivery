import { Express } from "express";
import { productsRoutes } from "./products.routes";
import userRoutes from "./users.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/product", productsRoutes);
};
