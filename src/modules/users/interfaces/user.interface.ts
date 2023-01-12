export interface IUser {
  userid: string;
  email: string;
  password: string | null;
  excludeAt: Date | null;
  role: string;
}
