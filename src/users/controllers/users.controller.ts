import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/users.service';
import { IResponseUser } from '../interfaces/user.interface';
import { Public } from '../../libs/passport/public.decorator';
import { Roles } from '../../roles/decorators/roles.decorator';
import { Role } from '../../roles/enums/role.enum';
import { JwtAuthGuard } from '../../libs/passport/jwt.guard';

@UseGuards(JwtAuthGuard)
@Roles(Role.User)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('/')
  async create(@Body() data: CreateUserDto): Promise<IResponseUser> {
    const user = await this.userService.create(data);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Get('/')
  async find(): Promise<IResponseUser[]> {
    const users = await this.userService.find();

    //map users and return only userid, email and role.
    return users.map((users) => ({
      userid: users.userid,
      email: users.email,
      roles: users.roles,
    }));
  }

  @Get('/:userid')
  async findOne(@Param('userid') userid: string): Promise<IResponseUser> {
    const user = await this.userService.findOne(userid);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Put('/:userid')
  async update(
    @Param() userid: string,
    @Body() data: CreateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.userService.put(userid, data);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Patch('/:userid')
  async patch(
    @Param() userid: string,
    @Body() data: UpdateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.userService.patch(userid, data);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Put('/:userid')
  async put(
    @Param() userid: string,
    @Body() data: CreateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.userService.put(userid, data);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Delete('/:userid')
  async exclude(@Param() userid: string) {
    const user = await this.userService.exclude(userid);

    return {
      userid: user.userid,
      excludeAt: user.excludeAt,
    };
  }
}
