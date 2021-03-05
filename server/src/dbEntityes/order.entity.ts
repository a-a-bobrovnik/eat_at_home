import { Dish } from 'src/dbEntityes/dish.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'customer_id' })
    customerId: number

    @ManyToMany(() => Dish)
    @JoinTable(
        {
            name: 'dishes_orders',
            joinColumn: {
                name: 'orders_id',
                referencedColumnName: 'id',
            },
            inverseJoinColumn: {
                name: 'dishes_id',
                referencedColumnName: 'id',
            }
        }
    )
    dishes: Dish[];
}