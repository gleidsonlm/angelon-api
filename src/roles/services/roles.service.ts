import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../../users/interfaces/user.interface';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { UpdateRolesDto } from '../dtos/update-roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsersRoles() {
    // const users = await this.userModel.find();
    const users = await this.userModel.aggregate([
      //aggregate all user documents by the roles values.
      { $unwind: '$roles' },
    ]);
    return users;
  }

  async getUserRole(userid: string) {
    const user = await this.userModel.findOne({ userid });
    return user;
  }

  async addUserRoles(data: UpdateRolesDto) {
    // check if user exists
    const userFound = await this.userModel.findOne({ userid: data.userid });
    if (!userFound) {
      throw new Error('User does not exist');
    }
    // check if user has the role already
    const userRoles = userFound.roles.map((role) => role.enum);
    // if they dont, add it.
    if (userRoles.includes(data.role) === false) {
      const user = await this.userModel.findOneAndUpdate(
        { userid: data.userid },
        {
          $push: { roles: { enum: Role.Staff } },
        },
        { new: true },
      );
      return user;
    }
    //or just return the existent user with the role.
    return userFound;
  }

  async removeUserRoles(data: UpdateRolesDto) {
    // check if user exists
    const userFound = await this.userModel.findOne({ userid: data.userid });
    if (!userFound) {
      throw new Error('User does not exist');
    }
    // check if user has the role
    const userRoles = userFound.roles.map((role) => role.enum);
    // if they do, remove it.
    if (userRoles.includes(data.role) === true) {
      const user = await this.userModel.findOneAndUpdate(
        { userid: data.userid },
        {
          $pull: { roles: { enum: Role.Staff } },
        },
        { new: true },
      );
      return user;
    }
    //or just return the existent user.
    return userFound;
  }
}
