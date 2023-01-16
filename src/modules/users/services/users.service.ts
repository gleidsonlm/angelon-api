import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { IResponseUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // Find - Use case for finding and query all users
  // @Role('admin')
  // todo: implement { Limit(Pagination), Sorting, Query(Filter) }
  async find(): Promise<IResponseUser[]> {
    const users = await this.userModel.find().exec();

    const responseUsers = users.map((user) => ({
      userid: user.userid,
      email: user.email,
      role: user.role,
    }));

    return responseUsers as IResponseUser[];
  }
}
