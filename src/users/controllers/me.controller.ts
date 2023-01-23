import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Public } from '../../libs/passport/public.decorator';

import { IResponseUser, Role } from '../interfaces/user.interface';
import { JwtAuthGuard } from '../../libs/passport/jwt.guard';
import { Roles } from '../../roles/decorators/roles.decorator';
import { MeService } from '../services/me.service';

@UseGuards(JwtAuthGuard)
@Roles(Role.Guest)
@Controller('me')
export class MeController {
  constructor(private meService: MeService) {}

  @Public()
  @Post()
  async create(@Body() data: CreateUserDto): Promise<IResponseUser> {
    const user = await this.meService.create(data);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Get()
  async findOne(@Request() request): Promise<IResponseUser> {
    const user = await this.meService.findOne(request.user.userid);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Patch()
  async patch(
    @Request() request: { user: { userid: string } },
    @Body() data: UpdateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.meService.patch(request.user.userid, data);

    return {
      userid: user.userid,
      email: user.email,
      roles: user.roles,
    };
  }

  @Delete()
  async exclude(@Request() request) {
    const user = await this.meService.exclude(request.user.userid);

    const { excludeAt } = user;
    return excludeAt;
  }
}
