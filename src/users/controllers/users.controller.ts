import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/users.service';
import { Public } from '../../libs/passport/public.decorator';
import { JwtAuthGuard } from '../../libs/passport/jwt.guard';
import { IResponseUser } from '../interfaces/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('/')
  async create(@Body() data: CreateUserDto): Promise<IResponseUser> {
    const user = await this.userService.create(data);

    const response = {
      userid: user.userid,
      email: user.email,
      role: user.role,
    };

    return response;
  }

  @Get('/')
  async find(): Promise<IResponseUser[]> {
    const users = await this.userService.find();

    //map the returned array for response
    const response = users.map((users) => {
      return {
        userid: users.userid,
        email: users.email,
        role: users.role,
      };
    });

    return response;
  }

  @Get('/:userid')
  async findOne(@Param('userid') userid: string): Promise<IResponseUser> {
    const user = await this.userService.findOne(userid);

    const response = {
      userid: user.userid,
      email: user.email,
      role: user.role,
    };

    return response;
  }

  @Patch('/:userid')
  async update(
    @Param('userid') userid: string,
    @Body() data: UpdateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.userService.update(userid, data);

    const response = {
      userid: user.userid,
      email: user.email,
      role: user.role,
    };

    return response;
  }

  @Delete('/:userid')
  async exclude(@Param('userid') userid: string) {
    const user = await this.userService.exclude(userid);

    const { excludeAt } = user;
    return excludeAt;
  }
}
