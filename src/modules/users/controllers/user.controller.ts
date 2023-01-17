import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);

    return user;
  }

  @Get('/')
  async find() {
    const users = await this.userService.find();

    return users;
  }

  @Get('/:userid')
  async findOne(@Param('userid') userid: string) {
    const users = await this.userService.findOne(userid);

    return users;
  }

  // @Put('/') // Not Implemented

  @Patch('/:userid')
  async update(@Headers('userid') userid: string, @Body() data: UpdateUserDto) {
    const user = await this.userService.update(userid, data);

    return user;
  }

  @Delete('/:userid')
  async exclude(@Headers('userid') userid: string) {
    const user = await this.userService.exclude(userid);

    return user;
  }
}
