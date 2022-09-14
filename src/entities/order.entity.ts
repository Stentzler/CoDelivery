import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
	Generated,
} from 'typeorm';
import {Products} from './products.entity';
import {Restaurant} from './restaurant.entity';
import {Users} from './user.entity';

@Entity('order')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({nullable: false, length: 60, default: 'Order sent to the restaurant'})
	status: string;

	@Generated('increment')
	orderNº: number;

	@CreateDateColumn()
	createdAt: Date;

	@Column({nullable: false, type: 'decimal', precision: 10, scale: 2})
	total: number;

	@ManyToMany(() => Products, {eager: true})
	@JoinTable()
	products: Products[];

	@ManyToOne(() => Users, user => user.orders)
	user: Users;

	@ManyToOne(() => Restaurant, restaurant => restaurant.orders, {eager: true})
	restaurant: Restaurant;
}
