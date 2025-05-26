import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { createResult, ResponseDate } from './user.result';
import { isEmptyObject } from 'utils';
@Injectable()
export class UserService {
  private readonly userService: User;
  getHello(): string {
    return 'Hello World!';
  }
  // 校验数据是否为空
  validate(createUserDto:User):ResponseDate {
    let result:ResponseDate = {};
    if (
      createUserDto.username == null ||
      createUserDto.username.trim() === ''
    ) {
      result = {
        code: 400,
        message: '用户名不能为空',
      };
    }
    return result;
  }
  create(user: User) {
    const validateResult = this.validate(user);
    if (isEmptyObject(validateResult)) {
      return createResult(validateResult);
    }
    // const existingUser= this.userService.findOne({username:user.username});
  }
}
