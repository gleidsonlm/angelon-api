export interface IUser {
  id: string;
  email: string;
  password: string;
  mobile: number | null;
  name: string | null;
  created: Date;
  updated: Date | null;
  excluded: Date | null;
  role: string;
}
