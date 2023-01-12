import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  mobile: string | null;
  created: Date;
  updated: Date;
  excluded: Date | null;
  role: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
    this.role = 'USER';
    this.created = new Date();
    this.updated = null;
    this.excluded = null;
  }
}
