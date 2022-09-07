import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("restaurantCategory")
class RestaurantCategory {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 60, unique: true })
  name: string;
}

export { RestaurantCategory };
