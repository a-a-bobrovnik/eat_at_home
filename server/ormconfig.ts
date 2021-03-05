import { Role } from './src/dbEntityes/role.entity';
import { Order } from './src/dbEntityes/order.entity';
import { DishPhoto } from './src/dbEntityes/dishPhoto.entity';
import { Dish } from './src/dbEntityes/dish.entity';
import { DishOrder } from './src/dbEntityes/dish-order.entity';
import { User } from './src/dbEntityes/user.entity'
import { ConnectionOptions } from 'typeorm'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3001,
  username: 'postgres',
  password: '0000',
  database: 'test',
  entities: [
    User, DishOrder, Dish, DishPhoto, Order, Role
  ],
  //We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: 'debug',
  migrations: ['dist/**/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}

export = connectionOptions