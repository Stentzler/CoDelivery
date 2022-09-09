import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
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

	@OneToOne(type => Users, {eager: true})
	@JoinColumn()
	user: Users;
}

export {PaymentInfo};
