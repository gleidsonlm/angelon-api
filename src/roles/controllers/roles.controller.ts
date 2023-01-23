import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../libs/passport/jwt.guard';
import { Role } from '../../users/interfaces/user.interface';
import { Roles } from '../decorators/roles.decorator';
import { UpdateRolesDto } from '../dtos/update-roles.dto';
import { RolesService } from '../services/roles.service';

@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  // Get many User.roles object's array.
  @Get()
  async getUsersRoles() {
    // call roles service return all users
    const users = await this.rolesService.getUsersRoles();
    // maps all users, filtering the response
    const response = users.map((users) => ({
      userid: users.userid,
      roles: users.roles,
    }));
    // return the response
    return response;
  }
  // Get one User.roles object.
  @Get(':userid')
  async getUserRoles(@Param('userid') userid: string) {
    // call roles service return one user
    const user = await this.rolesService.getUserRole(userid);
    // filter user to response
    const response = {
      userid: user.userid,
      roles: user.roles,
    };
    // return the response
    return response;
  }
  // Post roles to be added on user.
  @Post()
  async addUserRoles(@Body() data: UpdateRolesDto) {
    // call roles service and send the data object
    const user = await this.rolesService.addUserRoles(data);
    // prepare response with the received user
    const response = {
      userid: user.userid,
      roles: user.roles,
    };
    // return the response
    return response;
  }
  // Post roles to be removed from user.
  @Delete()
  async removeUserRoles(@Body() data: UpdateRolesDto) {
    // call roles service and send the data object
    const user = await this.rolesService.removeUserRoles(data);
    // prepare response with the received user
    const response = {
      userid: user.userid,
      roles: user.roles,
    };
    // return the response
    return response;
  }
}
