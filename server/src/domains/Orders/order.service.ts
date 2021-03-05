import { CreateOrderDto } from './dto/createOrder.dto';
import { DishOrder } from './../../dbEntityes/dish-order.entity';
import { Order } from './../../dbEntityes/order.entity';
import { Injectable } from '@nestjs/common';
import { getRepository } from "typeorm";

@Injectable()
export class OrdersService {

    getOrderRepository() {
        return getRepository(Order);
    }

    getDishOrderRepository() {
        return getRepository(DishOrder);
    }

    async getOrders(userId) {
        const userOrders = await this.getOrderRepository().find({
            relations: ['dishes'],
            where: [{ customerId: userId }]
        })

        return { err: null, data: userOrders }
    }

    async addNewOrder(userId: number, dto: CreateOrderDto) {
        const newOrderEntity = await this.getOrderRepository().insert({
            customerId: userId
        })

        const newOrderId = newOrderEntity.identifiers[0].id

        for (const dishId of dto.dishes) {
            await this.getDishOrderRepository().insert({
                orderId: newOrderId,
                dishId: dishId
            })
        }

        const newOrder = await this.getOrderRepository().findOne({
            relations: ['dishes'],
            where: [{ id: newOrderId }]
        })

        console.log(newOrderId)
        console.log(newOrder)

        return { err: null, data: newOrder }
    }
}