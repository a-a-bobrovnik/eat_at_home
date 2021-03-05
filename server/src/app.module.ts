import { AuthModule } from './domains/Auth/auth.module';
import { AuthController } from './domains/Auth/auth.controller';
import { UsersModule } from './domains/Users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from '../ormconfig';
import { DishesModule } from './domains/Dishes/dishes.module';
import { OrdersModule } from './domains/Orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    UsersModule,
    AuthModule,
    DishesModule,
    OrdersModule
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
