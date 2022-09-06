import { Express } from "express";
import restaurantRoutes from "./restaurants.routes";
import userRoutes from "./users.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRoutes);
  app.use("/restaurants", restaurantRoutes);
};
