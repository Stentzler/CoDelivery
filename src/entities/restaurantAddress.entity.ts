import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('restaurantAddress')
class RestaurantAddress {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60})
	address: string;

	@Column({length: 10})
	number: string;

	@Column({length: 20}) //Formato 99 99999-9999
	phoneNumber: string;

	@Column({length: 20})
	zipCode: string;

	@Column({length: 20})
	city: string;

	@Column({length: 20})
	state: string;

	@Column({length: 20, nullable: true})
	complement: string;
}

export {RestaurantAddress};
