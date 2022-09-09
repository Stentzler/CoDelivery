import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity('addressInfo')
class RestaurantAddress {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60})
	address: string;

	@Column({length: 10})
	number: string;

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
