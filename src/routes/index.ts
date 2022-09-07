
import restaurantRoutes from "./restaurants.routes";
import { productsRoutes } from "./products.routes";
import userRoutes from "./users.routes";
import sessionRoutes from "./session.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/login", sessionRoutes);
   app.use("/product", productsRoutes);
  app.use("/restaurants", restaurantRoutes);
};
