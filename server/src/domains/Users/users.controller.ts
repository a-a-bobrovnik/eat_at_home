import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Body, Controller, Delete, Get, Post, Req, Res, Param, Put, HttpCode, HttpStatus, UseGuards, Request, Header } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';
import { MainController } from 'src/MainController';

@Controller()
export class UsersController extends MainController {
    constructor(private readonly UserService: UserService) {
        super()
    }

    // _____PUBLIC_requests
    @Post('/users/registration')
    @Header('Access-Control-Allow-Origin', '*')
    async create(@Body() RegisterUserDto: RegisterUserDto, @Res() res: Response, @Request() req , ) {
        const responseData = await this.UserService.addNewUser(RegisterUserDto)
        res.send(this.validateResponseData(responseData))
    }

    // _____PRIVATE_requests

    @UseGuards(JwtAuthGuard)
    @Get('/users')
    async getUserData(@Res() res: Response, @Request() req) {
        const responseData = await this.UserService.getUserData(req.user.userId)
        res.send(this.validateResponseData(responseData))
    }


    @UseGuards(JwtAuthGuard)
    @Delete('/users')
    async delete(@Res() res: Response, @Request() req, @Body() password: string) {
        const responseData = await this.UserService.deleteUser(req.user, password)
        res.send(this.validateResponseData(responseData))
    }

    @UseGuards(JwtAuthGuard)
    @Put('/users')
    async update(@Request() req, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
        const responseData = await this.UserService.updateUser(req.user.userId, updateUserDto)
        res.send(this.validateResponseData(responseData))
    }
}
