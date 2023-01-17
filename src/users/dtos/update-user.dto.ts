import { PartialType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';
import { User } from '../schemas/user.schema';

export class UpdateUserDto extends PartialType(User) {
  @IsEmail()
  email?: string;

  password?: string;
}
