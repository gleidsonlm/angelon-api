export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  excludedAt: Date | null;
}
