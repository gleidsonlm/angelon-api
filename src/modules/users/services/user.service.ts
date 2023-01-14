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
  // @Role('guest') - Should start 1st step of registration
  // todo: Implement configuration to decide if: { strongPassword(Options) emailConfirmation(boolean), moderatorConfirmation(boolean) }
  async create(data: CreateUserDto) {
    const userExits = await this.userModel
      .findOne({ email: data.email })
      .exec();

    if (userExits) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userModel.create(data);

    return user.save();
  }

  // FindOne - Use case for finding an user
  // @Role('user') - Should find himself and others when authenticated
  // todo: requires authentication
  async findOne(userid: string): Promise<User> {
    const user = await this.userModel.findOne({ userid }).exec();

    return user;
  }

  // FindMany - Use case for finding and query all users
  // @Role('admin')
  // todo: implement { Limit(Pagination), Sorting, Query(Filter) }
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    return users;
  }
}
