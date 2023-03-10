import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
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
   * put - receives userDto and updates the user, if existent, or create and save a new user.
   * findOne - receives an userid and returns one matching user, if exists.
   * findOneByEmail - receives an email and returns one matching user, if exists.
   * find - receives the request and returns all users.
   * patch - receives the userid in the request and data in the body to update user data;
   * staff - receives the userid in the request and toggle staff role;
   * update - receives email and or password, check if users exists, update the user object in the database. Returns the updated user.
   * exclude - receives an userid and update the "excludeAt" user object propriety and returns the date and time of the exclusion. Doesn't permanentely remove the user object from the database.
   */

  // Create - Use case for creating an user
  // todo: Implement configuration to decide if: { strongPassword(Options) emailConfirmation(boolean), moderatorConfirmation(boolean) }
  async create(data: CreateUserDto) {
    // check if user exists
    const userExists = await this.userModel
      .findOne({ email: data.email })
      .exec();
    // if does, don't create and throw HttpException
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    // if not, hash the password:
    const rounds = 8;
    const hash = await bcrypt.hash(data.password, rounds);
    // create the user object
    const user = new this.userModel({
      email: data.email,
      password: hash,
    });
    // save and return user.
    return user.save();
  }

  // Find - Use case for finding and query other users
  // todo: implement { Limit(Pagination), Sorting, Query(Filter) }
  async find(): Promise<User[]> {
    const users = await this.userModel.find();
    //
    return users;
  }

  // FindOne - Use case for finding one user
  async findOne(userid: string): Promise<User> {
    const user = await this.userModel.findOne({ userid: userid }).exec();
    //
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    //
    return user;
  }

  // FindOneByEmail - Use case for finding an user by email address
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).exec();
    //
    return user;
  }

  // Patch - Use case for updating selected field in the user objetc
  async patch(userid: string, data: Partial<UpdateUserDto>): Promise<User> {
    //  find one user matching the userid field
    const userExists = await this.userModel.findOne({ userid }).exec();
    // if doesn't,
    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // if data has password
    if (data.password) {
      // hash the password,
      const rounds = 8;
      const hash = await bcrypt.hash(data.password, rounds);
      // assign hash for password
      userExists.password = hash;
    }
    // if data has email
    if (data.email) {
      userExists.email = data.email;
    }
    // save and return user.
    return userExists.save();
  }

  // Update - Use case for updating an user
  // async update(userid: string, data: UpdateUserDto): Promise<User> {
  //   // check if user exists
  //   const userExists = await this.userModel.findOne({ email: data.email });
  //   // if doesn't,
  //   if (!userExists) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   // hash the password,
  //   const rounds = 8;
  //   const hash = await bcrypt.hash(data.password, rounds);
  //   // assign values for proprieties
  //   userExists.password = hash;
  //   userExists.email = data.email;
  //   // return user saved
  //   return userExists.save();
  // }

  // Exclude - Use case for updating an user
  async exclude(userid: string) {
    const user = await this.userModel.findOneAndUpdate(
      { userid },
      { $currentDate: { excludeAt: true } },
      { new: true },
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
