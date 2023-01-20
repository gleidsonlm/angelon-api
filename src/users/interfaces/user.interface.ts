export enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

export interface IUser {
  userid: string;
  email: string;
  password: string | null;
  excludeAt: Date | null;
  roles: [{ enum: Role }];
}

export type IResponseUser = Omit<IUser, 'password' | 'excludeAt'> & {
  userid: string;
  email: string;
  roles: [{ enum: Role }];
};
