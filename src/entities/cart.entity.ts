import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
}

export {Cart};
