export interface IUser {
  userid: string;
  email: string;
  password: string | null;
  excludeAt: Date | null;
  role: string;
}

export type IResponseUser = Omit<IUser, 'password' | 'excludeAt' | 'role'> & {
  userid: string;
  email: string;
};
