import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../../users/interfaces/user.interface';
import { User } from '../../users/schemas/user.schema';

export class UpdateRolesDto extends PartialType(User) {
  userid: string;
  role: Role;
}
