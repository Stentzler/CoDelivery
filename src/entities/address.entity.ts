import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Users} from './user.entity';

@Entity('addressInfo')
class Address {
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

	@ManyToOne(() => Users, {nullable: true})
	user: Users;
}

export {Address};
