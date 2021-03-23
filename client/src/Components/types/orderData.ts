import { MainDishDto } from './../../api/types/mainDishDto';

export type OrderData ={
    id:number

    dishes:Array<MainDishDto>
}