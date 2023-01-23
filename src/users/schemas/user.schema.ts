import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { IUser, Role } from '../interfaces/user.interface';
import { v4 as uuid } from 'uuid-mongodb';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  // todo: implement generate uuid from email or _id
  @Prop({
    unique: true,
    default: () => uuid(),
  })
  userid: string;

  @IsEmail()
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  @IsNotEmpty()
  password: string;

  @Prop({ default: null })
  excludeAt: Date | null;

  @Prop({ default: [{ enum: Role.Guest }] })
  roles: [{ enum: Role }];
}

export const UserSchema = SchemaFactory.createForClass(User);
