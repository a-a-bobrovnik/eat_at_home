import { Dish } from './dish.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity({name:'dishes_photo'})
export class DishPhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'dishes_id' })
    dishesId: number;

    @Column({ name: 'photo_url' })
    photoUrl: string;

    @ManyToOne(() => Dish, dish => dish.photoUrl)
    @JoinColumn({ name: 'dishes_id' })
    dish: Dish
}
