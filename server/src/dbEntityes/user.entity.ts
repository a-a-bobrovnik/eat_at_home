import { Dish } from './dish.entity';
import { Order } from './order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : "first_name"})
    firstName: string;

    @Column({name : "last_name"})
    lastName: string;

    @Column()
    email: string;

    @Column({name : "role_id"})
    roleId: number;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @OneToMany(() => Dish, dish =>  dish.chef )
    dishes: Dish[];
}
