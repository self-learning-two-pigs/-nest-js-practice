import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateDto, UserDto } from './user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  }

  @Put(':id/password')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDto,
  ) {
    await this.userService.update(id, updateDto);
  }
}
