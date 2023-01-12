export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string | null;
  mobile: string | null;
  created: Date;
  updated: Date | null;
  excluded: Date | null;
  role: string;
}
