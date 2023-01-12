import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUsersRepository } from './interfaces/users.repository.interface';

export class UsersRepository implements IUsersRepository {
  create(data: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findOneByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  exclude(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
