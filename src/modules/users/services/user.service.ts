import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IResponseUser } from '../interfaces/user.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // Create - Use case for creating an user
  // @Role('admin','guest') - Should start 1st step of registration
  // todo: Implement configuration to decide if: { strongPassword(Options) emailConfirmation(boolean), moderatorConfirmation(boolean) }
  async create(data: CreateUserDto) {
    if (!data.email) {
      throw new HttpException('Must have an email', HttpStatus.CONFLICT);
    }

    const userExits = await this.userModel
      .findOne({ email: data.email })
      .exec();

    if (userExits) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.userModel.create(data);

    return user.save();
  }

  // FindOne - Use case for finding an user
  // @Role('admin','user','self') - Should find himself and others when authenticated
  // todo: requires authentication
  async findOne(userid: string): Promise<IResponseUser> {
    const user = await this.userModel.findOne({ userid }).exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { email } = user;

    return { userid, email } as IResponseUser;
  }

  // Find - Use case for finding and query all users
  // @Role('admin')
  // todo: implement { Limit(Pagination), Sorting, Query(Filter) }
  async find(): Promise<IResponseUser[]> {
    const users = await this.userModel.find().exec();

    const responseUsers = users.map((user) => ({
      userid: user.userid,
      email: user.email,
    }));

    return responseUsers as IResponseUser[];
  }

  // Update - Use case for updating an user
  // @Role('admin','self')
  // todo: requires authentication
  async update(userid: string, data: UpdateUserDto): Promise<IResponseUser> {
    const user = await this.userModel.findOneAndUpdate(
      { userid },
      { email: data.email, password: data.password },
      { new: true },
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { email } = user;

    return { userid, email } as IResponseUser;
  }

  // Exclude - Use case for updating an user
  // @Role('admin','self')
  // todo: requires authentication
  async exclude(userid: string): Promise<Date> {
    const user = await this.userModel.findOneAndUpdate(
      { userid },
      { excludeAt: new Date() },
      { new: true },
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.excludeAt as Date;
  }
}
