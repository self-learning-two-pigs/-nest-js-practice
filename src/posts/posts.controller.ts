import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  UseFilters,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './posts.dto';
import { HttpExceptionFilter } from '../common/filter/http-exception/http-exception.filter';
import { DemoRoleGuard } from '../common/guard/demo-role/demo-role.guard';
import { Roles } from '../common/decorator/roles/roles.decorator';
import { TransformInterceptor } from '../common/interceptor/transform/transform.interceptor';
import { User } from '../common/decorator/user/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  getAll(@Req() req, @User() user) {
    console.log('req.user', req.user);
    console.log('user', user);
    return this.postsService.getAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(DemoRoleGuard)
  @Roles('member', 'guest')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: Partial<CreatePostDto>,
  ) {
    return this.postsService.update(id, updates);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
