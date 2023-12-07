import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './posts.dto';
import { HttpExceptionFilter } from '../common/http-exception/http-exception.filter';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  getById(@Param('id') id: string) {
    return this.postsService.getById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updates: Partial<CreatePostDto>) {
    return this.postsService.update(Number(id), updates);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(Number(id));
  }
}
