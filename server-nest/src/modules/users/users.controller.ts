import { Body, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);

    return user;
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async findOne(@Param('id') id: number): Promise<User> {
    const user = this.usersService.findOne(id);

    return user;
  }
}
