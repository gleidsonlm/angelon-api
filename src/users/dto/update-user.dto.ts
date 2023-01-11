import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(User) {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
}
