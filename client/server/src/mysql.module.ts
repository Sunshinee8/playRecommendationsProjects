import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User/user.entity';
import { UserService } from './User/user.service';
import { UserController } from './User/user.controller';
import config from "./config/index"
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      username: config.MYSQL_USERNAME,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE,
      // entities: [],
      // synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [ UserService],
})
export class MySqlModule {}
