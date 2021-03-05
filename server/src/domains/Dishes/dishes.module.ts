import { DishesController } from './dishes.controller';
import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';

@Module({
    providers: [DishesService],
    controllers: [DishesController],
    exports:[]
})

export class DishesModule { }