import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  VersionColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Products } from "./products.entity";
import { Restaurant } from "./restaurant.entity";
import { Users } from "./user.entity";

@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, length: 60, default: 'Preparando'})
  status: string;

  @VersionColumn()
  orderNº: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false, type: "decimal", precision: 10, scale: 2 })
  total: number;

  @ManyToMany(() => Products, { eager: true })
  @JoinTable()
  products: Products[];

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @ManyToMany(() => Restaurant, {eager: true})
  restaurant: Restaurant[];
}
