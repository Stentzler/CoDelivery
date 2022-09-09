import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  VersionColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Products } from "./products.entity";
import { Restaurant } from "./restaurant.entity";
import { Users } from "./user.entity";

@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, length: 60 })
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

  // Relação ManyToOne com a tabela Users. Um User pode fazer várias ordens mas Uma ordem pertence só a um user
  // @ManyToOne(()=> Users, user => user.orders)
  // user: Users

  // Relação OneToOne com o restaurante. A ordem somente pode estar relacionada com um restaurante e o restaurante somente com uma order. Acredito que essa relaçao deveria ser OneToMany pois o restaurante pode receber várias ordens.
  // @OneToOne( () => Restaurant, {eager: true})
  // @JoinColumn()
  // restaurant: Restaurant
}
