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
enum Role {
  admin = 'ADMIN',
  engineer = 'ENGINEER',
  intern = 'INTERN',
}
@Controller('users')
export class UsersController {
  @Get() //"/users"
  findAll(@Query('role') role?: Role) {
    return { role };
  }
  @Get(':id') //"/users/id"
  findOne(@Param('id') id: string) {
    return { id };
  }
  @Post() //"/users"
  createUser(@Body() user: any): any {
    return user;
  }
  @Patch(':id') //"/users/id"
  updateUser(@Param('id') id: string, @Body() updatedInfo: any): any {
    return { id, ...updatedInfo };
  }
  @Delete(':id') //"/users/id"
  deleteUser(@Param('id') id: string) {
    return {
      id: id,
      message: 'User Has been Deleted',
    };
  }
}
