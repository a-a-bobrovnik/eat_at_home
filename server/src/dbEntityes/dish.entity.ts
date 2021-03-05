import { DishPhoto } from './dishPhoto.entity';
import { User } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity({ name: 'dishes' })
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'chef_id' })
    chefId: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column({name:'status_active'})
    status: boolean;

    @OneToMany(() => DishPhoto, photo => photo.dish)
    photoUrl: DishPhoto[];

    @ManyToOne(() => User, user => user.dishes)
    @JoinColumn({ name: 'chef_id' })
    chef: User;
}
