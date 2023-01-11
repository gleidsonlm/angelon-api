import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { IUsersRepository } from '../IUsersRepositories';

export class InMemoryUsersRepository implements IUsersRepository {
  private readonly users: User[] = [];

  async create(data: CreateUserDto): Promise<User> {
    // todo: creator must be: authenticated and administrator.
    // create user.
    const user = new User(data);

    this.users.push(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    // todo: add limit, and add pagination.
    // returns all users.
    return this.users;
  }

  async findOneById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
  async findOneByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    // assign received value in data to existent user
    const user = this.users.find((user) => user.id === id);

    Object.assign(user, data);
    data.username ? (user.username = data.username) : user.username;
    data.email ? (user.email = data.email) : user.email;
    data.password ? (user.password = data.password) : user.password;
    data.name ? (user.name = data.name) : user.name;
    data.updatedAt = new Date();

    return user;
  }

  async exclude(id: string): Promise<void> {
    // update user excludedAt to now
    const user = this.users.find((user) => user.id === id);

    user.excludedAt = new Date();
  }
}
