import { MainController } from './../../mainController';
import { Controller, Post, UseGuards, Req, Get, Res, Header, Delete } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController extends MainController {
    constructor(private authService: AuthService) {
        super()
    }

    @Delete('auth/logout')
    async removeToken(@Req() req: Request, @Res() res: Response) {
        res.clearCookie('EAH_token').send('cookie is clear')
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @Header('Access-Control-Allow-Origin', 'http://localhost:3002')
    async login(@Req() req: Request, @Res() res: Response) {
        const responseData = await this.authService.login(req.user);
        res.cookie('EAH_token', responseData.access_token, { path: '/' }).send(req.user)
    }
}