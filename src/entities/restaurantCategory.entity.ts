import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Restaurant} from './restaurant.entity';

@Entity('restaurantCategory')
class RestaurantCategory {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60, unique: true})
	name: string;

	@OneToMany(() => Restaurant, restaurant => restaurant.category)
	restaurants: Restaurant[];
}

export {RestaurantCategory};
