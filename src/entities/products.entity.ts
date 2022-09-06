import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';
import {ProductCategory} from './categories.entity';
import {Restaurant} from './restaurant.entity';

@Entity('products')
class Products {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60})
	name: string;

	@Column({length: 256})
	description: string;

	@Column({type: 'decimal', precision: 12, scale: 2, nullable: false})
	price: number;

	@Column({length: 256})
	img_url: string;

	@Column({default: true})
	isAvailable: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => ProductCategory)
	category: ProductCategory;

	@ManyToOne(() => Restaurant)
	restaurant: Restaurant;
}

export {Products};
