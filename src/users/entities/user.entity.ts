import { randomUUID } from 'node:crypto';
import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  excludedAt: Date | null;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
    this.id = randomUUID();
    this.role = 'USER';
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
    this.excludedAt = null;
  }
}
