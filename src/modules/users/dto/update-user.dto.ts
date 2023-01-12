import { PartialType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';

export class UpdateUserDto extends PartialType(User) {
  email?: string;
  password?: string;
}
