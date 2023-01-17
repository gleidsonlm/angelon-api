import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IResponseUser } from '../interfaces/user.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IsEmail } from 'class-validator';

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
    const userExits = await this.userModel
      .findOne({ email: data.email })
      .exec();

    if (userExits) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const userCreated = await this.userModel.create(data);
    const userSaved = await userCreated.save({
      validateBeforeSave: true,
      checkKeys: true,
    });
    const { userid, email } = userSaved;

    return { userid, email } as IResponseUser;
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

  // Find - Use case for finding and query other users
  // @Role('admin')
  // todo: implement { Limit(Pagination), Sorting, Query(Filter) }
  async find(): Promise<IResponseUser[]> {
    const users = await this.userModel.find();

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
  async exclude(userid: string) {
    const user = await this.userModel.findOneAndUpdate(
      { userid },
      { $currentDate: { excludeAt: true } },
      { new: true },
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { excludeAt } = user;

    return { userid, excludeAt };
  }
}
