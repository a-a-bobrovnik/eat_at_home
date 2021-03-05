import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';


@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() req: Request) {
        return this.authService.login(req.user);
    }
}