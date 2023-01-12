import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  private readonly usersRepository = new UsersRepository();

  // Use Case for creating a new user
  create(createUserDto: CreateUserDto) {
    const isRegistered = async () => {
      const user = await this.findOneByEmail(createUserDto.email);
      return user;
    };

    // Don't creating a new user with already registered email
    if (isRegistered()) {
      throw new Error('This email has been already registered in our base.');
    }

    return this.usersRepository.create(createUserDto);
  }

  // Return the matching user by user.id
  findOneById(id: string) {
    return this.usersRepository.findOneById(id);
  }

  // Return the matching user by user.email
  findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  // List all users
  findAll() {
    // todo: add limit
    // todo: add pagination
    // todo: add sorting
    return this.usersRepository.findAll();
  }

  // Update the matching user with provided data
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  // Exclude the matching user
  exclude(id: string) {
    return this.usersRepository.exclude(id);
  }
}
