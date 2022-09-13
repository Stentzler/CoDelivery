import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Products} from './products.entity';
@Entity('productCategory')
class ProductCategory {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60, unique: true})
	name: string;

	@OneToMany(() => Products, products => products.category)
	products: Products[];
}

export {ProductCategory};
