import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserService } from '../services/users.service';
import { Public } from '../../libs/passport/public.decorator';
import { JwtAuthGuard } from '../../libs/passport/jwt.guard';
import { IResponseUser } from '../interfaces/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
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
  async findOne(@Request() request): Promise<IResponseUser> {
    const user = await this.userService.findOne(request.user.userid);

    const response = {
      userid: user.userid,
      email: user.email,
      role: user.role,
    };

    return response;
  }

  @Patch('/')
  async update(
    @Request() request,
    @Body() data: UpdateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.userService.update(request.user.userid, data);

    const response = {
      userid: user.userid,
      email: user.email,
      role: user.role,
    };

    return response;
  }

  @Delete('/')
  async exclude(@Request() request) {
    const user = await this.userService.exclude(request.user.userid);

    const { excludeAt } = user;
    return excludeAt;
  }
}
