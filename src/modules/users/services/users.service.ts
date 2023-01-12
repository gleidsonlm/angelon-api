import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersDocument: Model<UserDocument>,
  ) {}

  // Use Case for creating a new user
  async create(createUserDto: CreateUserDto) {
    const emailIsRegistred = await this.usersDocument
      .findOne({ email: `${createUserDto.email}` })
      .exec();

    // Don't creating a new user with already registered email
    if (emailIsRegistred) {
      throw new Error('This email has been already registered in our base.');
    }

    const user = await this.usersDocument.create(createUserDto);

    return user;
  }
}
