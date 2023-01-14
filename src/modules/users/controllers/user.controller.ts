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
import { UserService } from '../services/user.service';

interface IResponseUser {
  userid: string;
  email: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      await this.userService.create(data);

      return HttpStatus.CREATED;
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findOne(@Headers('email') email: string): Promise<IResponseUser> {
    const user = await this.userService.findOne(email);

    //todo: implement JWT, user can be a sub within token.
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User \/${email}\/ not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // return user;
    return { userid: user.userid, email: user.email } as IResponseUser;
  }
}
