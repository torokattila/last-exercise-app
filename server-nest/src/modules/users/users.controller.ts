import { Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<User> {
    const user = this.usersService.findOne(id);

    return user;
  }
}
