import {Exclude} from 'class-transformer';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import {Products} from './products.entity';
import {RestaurantCategory} from './restaurantCategory.entity';
import {RestaurantAddress} from './restaurantAddress.entity';

@Entity('restaurant')
class Restaurant {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60, unique: true})
	name: string;

	@Column({length: 256})
	description: string;

	@Column({default: true})
	isRestaurant: boolean;

	@Column({length: 60, unique: true})
	email: string;

	@Column({length: 256})
	img_url: string;

	@Column({length: 120})
	@Exclude()
	password: string;

	@Column({length: 60, unique: true})
	cnpj: string;

	@Column({length: 60})
	phoneNumber: string;

	@Column({default: true})
	isActive: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => Products, product => product.restaurant)
	products: Products[];

	@OneToOne(type => RestaurantAddress, {eager: true})
	@JoinColumn()
	address: RestaurantAddress;

	@ManyToOne(() => RestaurantCategory)
	category: RestaurantCategory;
}

export {Restaurant};
