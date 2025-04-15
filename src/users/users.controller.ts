import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {} // dependency Injection:
  // returning existing instance i it has already been requested elsewhere the dependency is resolved and passed to your controller's constructor

  @Get() //"/users"
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get(':id') //"/users/id"
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post() //"/users"
  createUser(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    this.userService.createUser(createUserDto);
  }

  @Patch(':id') //"/users/id"
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateuserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateuserDto);
  }

  @Delete(':id') //"/users/id"
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
