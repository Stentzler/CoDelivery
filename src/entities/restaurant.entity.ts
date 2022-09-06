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
} from 'typeorm';
import {RestaurantAddress} from './restaurantAddress.entity';
import {RestaurantCategory} from './restaurantCategory.entity';

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

	@Column({length: 120})
	@Exclude()
	password: string;

	@Column({length: 60, unique: true})
	cnpj: string;

	@Column({default: true})
	isActive: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(type => RestaurantAddress, {eager: true})
	@JoinColumn()
	restaurantAddress: RestaurantAddress;

	@ManyToOne(() => RestaurantCategory)
	category: RestaurantCategory;
}

export {Restaurant};
