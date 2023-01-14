import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IResponseUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);

    return user;
  }

  @Get()
  async findOne(@Headers('userid') userid: string) {
    const user = await this.userService.findOne(userid);

    if (!user) {
      return new HttpException(
        {
          message: 'User not found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return { userid: user.userid, email: user.email } as IResponseUser;
  }
}
