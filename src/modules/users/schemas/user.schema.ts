import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    unique: true,
    default: `${randomUUID()}`,
  })
  userid: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop({ default: null })
  @Exclude()
  password?: string | null;

  @Prop({ default: null })
  @Exclude()
  excludeAt?: Date | null;

  @Prop({
    enum: ['admin', 'user', 'guest'],
    default: 'user',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
