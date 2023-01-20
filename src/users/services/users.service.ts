import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  // Instances the Database module with the User scheme
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /* Users Use Cases
   * create - receives userDto, check if users exists, create the user object and saves in the database. Returns the user saved.
   * findOne - receives an userid and returns one matching user, if exists.
   * findOneByEmail - receives an email and returns one matching user, if exists.
   * find - receives the request and returns all users.
   * patch - receives the userid in the request and data in the body to update user data;
   * put - receives userDto and updates the user, if existent, or create and save a new user.
   * update - receives email and or password, check if users exists, update the user object in the database. Returns the updated user.
   * exclude - receives an userid and update the "excludeAt" user object propriety and returns the date and time of the exclusion. Doesn't permanentely remove the user object from the database.
   */

  // Create - Use case for creating an user
  // todo: Implement configuration to decide if: { strongPassword(Options) emailConfirmation(boolean), moderatorConfirmation(boolean) }
  async create(data: CreateUserDto) {
    const userExits = await this.userModel
      .findOne({ email: data.email })
      .exec();

    if (userExits) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userModel.create(data);

    return user.save();
  }

  // FindOne - Use case for finding one user
  async findOne(_userid: string): Promise<User> {
    const user = await this.userModel.findOne({ userid: _userid }).exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  // FindOneByEmail - Use case for finding an user by email address
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }

  // Find - Use case for finding and query other users
  // todo: implement { Limit(Pagination), Sorting, Query(Filter) }
  async find(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  // Patch - Use case for updaing selected field in the user objetc
  async patch(_userid: string, data: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ _userid }, { $set: data }, { new: true })
      .exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  // Put - Use case for updating or creating an user
  async put(_userid: string, data: CreateUserDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ _userid }, { $set: data }, { new: true })
      .exec();

    return user.save();
  }

  // Update - Use case for updating an user
  async update(_userid: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ _userid }, { $set: data }, { new: true })
      .exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  // Exclude - Use case for updating an user
  async exclude(_userid: string) {
    const user = await this.userModel.findOneAndUpdate(
      { _userid },
      { $currentDate: { excludeAt: true } },
      { new: true },
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
