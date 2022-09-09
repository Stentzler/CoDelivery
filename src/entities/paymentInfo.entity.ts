import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import {Products} from './products.entity';
import {Restaurant} from './restaurant.entity';
import {Users} from './user.entity';

@Entity('paymentInfo')
class PaymentInfo {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column({length: 60})
	Name: string;

	@Column({length: 20})
	cardNo: string;

	@Column({length: 10})
	cvvNo: string;

	@Column({length: 20}) //Formato YYYY/MM/DD
	expireDate: string;

	@Column({length: 20})
	cpf: string;

	@ManyToMany(type => Products, {
		eager: true,
	})
	@JoinTable()
	products: Products[];

	@OneToOne(type => Restaurant, {eager: true})
	@JoinColumn()
	restaurant: Restaurant;

	@OneToOne(type => Users, {eager: true})
	@JoinColumn()
	user: Users;
}

export {PaymentInfo};
