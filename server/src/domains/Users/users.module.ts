import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
    providers: [UserService],
    controllers: [UsersController],
    exports:[UserService]
})

export class UsersModule { }