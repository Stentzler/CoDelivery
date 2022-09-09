import {Exclude} from 'class-transformer';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	OneToOne,
	OneToMany,
} from 'typeorm';
import {Address} from './address.entity';
import {Cart} from './cart.entity';
import { Order } from './order.entity';
import {PaymentInfo} from './paymentInfo.entity';

@Entity('users')
class Users {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60})
	fullName: string;

	@Column({length: 60})
	userName: string;

	@Column({length: 60, unique: true})
	email: string;

	@Column({length: 120})
	@Exclude()
	password: string;

	@Column({default: false})
	isRestaurant: boolean;

	@Column({default: true})
	isActive: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(type => PaymentInfo, {eager: true})
	@JoinColumn()
	paymentInfo: PaymentInfo;

	@OneToOne(type => Cart, {eager: true})
	@JoinColumn()
	cart: Cart;

	@OneToMany(() => Address, adress => adress.user)
	addresses: Address[];

	// Relação OneToMany com a tabela Order. O lado one da relação é o User pois ele é o dono da ordem
	// @OneToMany( () => Order, orders => orders.user, {eager: true})
	// orders: Order[]
}

export {Users};
