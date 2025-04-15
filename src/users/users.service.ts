import { Injectable } from '@nestjs/common';

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
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  createUser(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
  }
  updateUser(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
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
