import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'yehia',
      email: 'yehia@yahoo.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'youssef',
      email: 'youssef@yahoo.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'mohamed',
      email: 'mohamed@yahoo.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'yassen',
      email: 'yassen@yahoo.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    const validRoles = ['INTERN', 'ENGINEER', 'ADMIN'];

    // If role is provided but not valid
    if (role && !validRoles.includes(role)) {
      throw new NotFoundException('Role Not Found');
    }

    // If no role is provided, return all users
    if (!role) {
      return this.users;
    }

    // Otherwise, return users with the given role
    return this.users.filter((user) => user.role === role);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User Not found');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  deleteUser(id: number) {
    const userToBeRemoved = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    if (!userToBeRemoved) {
      return 'User Not Found';
    }
    return { message: 'User been Deleted', ...userToBeRemoved };
  }
}
