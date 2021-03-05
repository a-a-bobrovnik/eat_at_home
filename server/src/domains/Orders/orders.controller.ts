import { Body, Controller, Delete, Get, Post, Req, Res, Param, Put, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { MainController } from 'src/MainController';
import { Response } from 'express';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrdersService } from './order.service';

@Controller()
export class OrdersController extends MainController {
    constructor(private readonly OrdersService: OrdersService) {
        super()
    }

    // _____PRIVATE_requests

    @UseGuards(JwtAuthGuard)
    @Get('/orders/')
    async getUserOrders(@Request() req, @Res() res: Response) {
        const responseData = await this.OrdersService.getOrders(req.user.userId)
        return res.send(this.validateResponseData(responseData))
    }



    @UseGuards(JwtAuthGuard)
    @Post('/orders/')
    async create(@Body() CreateOrderDto: CreateOrderDto, @Res() res: Response, @Request() req) {
        const responseData = await this.OrdersService.addNewOrder(req.user.userId, CreateOrderDto)
        res.send(this.validateResponseData(responseData))
    }
}