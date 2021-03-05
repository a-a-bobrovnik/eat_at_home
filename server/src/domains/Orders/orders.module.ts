import { OrdersService } from './order.service';
import { OrdersController } from './orders.controller';
import { Module } from '@nestjs/common';

@Module({
    providers: [OrdersService],
    controllers: [OrdersController],
    exports:[]
})

export class OrdersModule { }