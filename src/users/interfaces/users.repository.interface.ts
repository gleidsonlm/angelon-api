import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

/* Define an Interface for repositories of the IUser objects */
export interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOneById(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  exclude(id: string): Promise<void>;
}
