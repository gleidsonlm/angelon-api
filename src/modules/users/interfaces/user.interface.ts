export interface IUser {
  userid: string;
  email: string;
  password: string | null;
  excludeAt: Date | null;
  role: string;
}

export interface IResponseUser {
  userid: string;
  email: string;
}
