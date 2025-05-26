import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "./user.entity"

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post()
  create(createUesr:User){
     return this.userService.create(createUesr);
  }
}
