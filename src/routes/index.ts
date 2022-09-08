import { Express } from "express";

import restaurantRoutes from "./restaurants.routes";
import { productsRoutes } from "./products.routes";
import userRoutes from "./users.routes";
import sessionRoutes from "./session.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/login", sessionRoutes);
   app.use("/products", productsRoutes);
  app.use("/restaurants", restaurantRoutes);
};
