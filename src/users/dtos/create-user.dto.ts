import { PartialType } from '@nestjs/mapped-types';
import { IsEmail } from 'class-validator';
import { User } from '../schemas/user.schema';

export class CreateUserDto extends PartialType(User) {
  @IsEmail()
  email: string;

  password: string;
}
