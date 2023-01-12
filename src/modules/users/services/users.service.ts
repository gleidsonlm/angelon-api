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
  create(createUserDto: CreateUserDto) {
    const isRegistered = async () => {
      const user = await this.usersDocument.findOne();
      return user;
    };

    // Don't creating a new user with already registered email
    if (isRegistered()) {
      throw new Error('This email has been already registered in our base.');
    }

    return this.usersDocument.create(createUserDto);
  }
  /* 
  // Return the matching user by user.id
  findOneById(id: string) {
    return this.usersDocument.findOneById(id);
  }

  // Return the matching user by user.email
  findOneByEmail(email: string) {
    return this.usersDocument.findOneByEmail(email);
  }

  // List all users
  findAll() {
    // todo: add limit
    // todo: add pagination
    // todo: add sorting
    return this.usersDocument.findAll();
  }

  // Update the matching user with provided data
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersDocument.update(id, updateUserDto);
  }

  // Exclude the matching user
  exclude(id: string) {
    return this.usersDocument.exclude(id);
  } */
}
