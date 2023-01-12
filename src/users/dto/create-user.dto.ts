import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDto extends PartialType(User) {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
}
