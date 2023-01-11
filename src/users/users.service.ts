import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryUsersRepository } from './repositories/implementations/InMemoryUsersRepository';

@Injectable()
export class UsersService {
  private readonly usersRepository = new InMemoryUsersRepository();

  create(createUserDto: CreateUserDto) {
    const isRegistered = async () => {
      const user = await this.usersRepository.findOneByEmail(
        createUserDto.email,
      );
      return user;
    };

    if (isRegistered()) {
      throw new Error('User Already Registered');
    }
    return this.usersRepository.create(createUserDto);
  }

  findOneById(id: string) {
    return this.usersRepository.findOneById(id);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  exclude(id: string) {
    return this.usersRepository.exclude(id);
  }
}
