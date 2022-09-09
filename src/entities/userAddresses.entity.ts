import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('userAddress')
class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 60 })
  street: string;

  @Column({ length: 10 })
  number: string;

  @Column({ length: 20 })
  zipCode: string;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 20 })
  state: string;

  @Column({ length: 20, nullable: true })
  complement: string;

  @ManyToOne((type) => Users, (user) => user.address, { onDelete: 'CASCADE' })
  user: Users;
}

export { UserAddress };
