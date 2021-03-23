import { UpdateUserDto } from './../Users/dto/updateUser.dto';
import { Body, Controller, Delete, Get, Post, Req, Res, Param, Put, HttpCode, HttpStatus, UseGuards, Request, Header } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/createDish.dto';
import { MainController } from 'src/MainController';
import { UpdateDishDto } from './dto/updateDishDto.dto';

@Controller()
export class DishesController extends MainController {
    constructor(private readonly DishesService: DishesService) {
        super()
    }

    // _____PUBLIC_requests


    @Get('/dishes')
    @HttpCode(HttpStatus.OK)
    async getAllDishes() {
        return await this.DishesService.getDishes()
    }

    // _____PRIVATE_requests

    @UseGuards(JwtAuthGuard)
    @Post('/dishes')
    async create(@Body() dto: CreateDishDto, @Request() req, @Res() res: Response) {
        console.log(req.user.userId)
        const responseData = await this.DishesService.addNewDishes(dto, req.user.userId)
        res.send(this.validateResponseData(responseData))
    }

    @UseGuards(JwtAuthGuard)
    @Put('/dishes/:dishId')
    async update(@Body() dto: UpdateDishDto, @Param('dishId') dishId: number, @Res() res: Response, @Request() req) {
        const responseData = await this.DishesService.updateDish(dishId, req.user.userId, dto)
        res.send(this.validateResponseData(responseData))
    }


    // @UseGuards(JwtAuthGuard)
    // @Delete('/dishes/:dishId')
    // delete(@Param('dishId') dishId: number, @Res() res: Response, @Request() req) {
    //     const responseData = this.DishesService.deleteDish(dishId, req.user.userId)
    //     res.send(this.validateResponseData(responseData))
    // }
}