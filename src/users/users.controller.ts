import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {} // dependency Injection:
  // returning existing instance i it has already been requested elsewhere the dependency is resolved and passed to your controller's constructor
  @Get() //"/users"
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }
  @Get(':id') //"/users/id"
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); //unary plus converts to number
  }
  @Post() //"/users"
  createUser(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.userService.createUser(user);
  }
  @Patch(':id') //"/users/id"
  updateUser(
    @Param('id') id: string,
    @Body()
    updatedInfo: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.userService.updateUser(+id, updatedInfo);
  }
  @Delete(':id') //"/users/id"
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
