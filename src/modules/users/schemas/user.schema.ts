import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

@Schema()
export class User {
  @Prop({
    unique: true,
    default: `${randomUUID()}`,
  })
  userid: string;

  @Prop({
    match: [
      RegExp,
      '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/',
    ],
  })
  email: string;

  @Prop({ default: null })
  password: string | null;

  @Prop({ default: null })
  excludeAt: Date | null;

  @Prop({
    enum: { ADMIN: 'admin', USER: 'user', GUEST: 'guest' },
    default: 'USER',
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
