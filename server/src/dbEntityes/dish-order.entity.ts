import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'dishes_orders' })
export class DishOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({ name: 'orders_id' })
    orderId: number

    @PrimaryColumn({ name: 'dishes_id' })
    dishId: number
}