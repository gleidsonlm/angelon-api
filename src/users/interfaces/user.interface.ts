export interface IUser {
  userid: string;
  email: string;
  password: string | null;
  excludeAt: Date | null;
  role: string;
}

export type IResponseUser = Omit<IUser, 'password' | 'excludeAt'> & {
  userid: string;
  email: string;
  role: string;
};
