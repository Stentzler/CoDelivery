import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Products} from './products.entity';

@Entity('cart')
class Cart {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({
		type: 'decimal',
		precision: 12,
		scale: 2,
		default: 0,
		nullable: false,
	})
	subtotal: number;

	@ManyToMany(type => Products, {eager: true})
	@JoinTable()
	products: Products[];
}

export {Cart};
