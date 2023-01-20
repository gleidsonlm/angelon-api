import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Role } from '../interfaces/user.interface';
import { v4 as uuid } from 'uuid-mongodb';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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

  //todo: implement pass crypt
  @Prop({ default: null })
  @Exclude()
  password?: string | null;

  @Prop({ default: null })
  @Exclude()
  excludeAt?: Date | null;

  @Prop({ default: [Role.User] })
  roles: [{ enum: Role }];
}

export const UserSchema = SchemaFactory.createForClass(User);
