import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	VersionColumn,
	ManyToMany,
	JoinTable,
	ManyToOne,
	OneToOne,
	JoinColumn,
	OneToMany,
	PrimaryColumn,
	Generated,
} from 'typeorm';
import {Products} from './products.entity';
import {Restaurant} from './restaurant.entity';
import {Users} from './user.entity';

@Entity('Order')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({nullable: false, length: 60, default: 'Preparando'})
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

	@ManyToOne(() => Restaurant,  restaurant => restaurant.orders, { eager: true})
	restaurant: Restaurant;
}
