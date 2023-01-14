import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // Create - Use case for creating an user
  async create(data: CreateUserDto): Promise<User> {
    // Check if this user email is registered in the base.
    const userExists = await this.userModel.findOne({
      email: data.email,
    });

    // If it is, throw error for Controller handling.
    if (userExists) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    // Otherwise, creates its data
    const user = await this.userModel.create(data);
    user.save();

    // And return the user created;
    return user;
  }

  // FindOne - Use case for finding an user
  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();

    return user;
  }

  // FindMany - Use case for finding all users
  // todo: implement pagination
  // todo: implement sorting
  // todo: implement filter(query)
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    return users;
  }
}
