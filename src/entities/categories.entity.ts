import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("productCategory")
class ProductCategory {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 60, unique: true })
  name: string;
}

export { ProductCategory };
