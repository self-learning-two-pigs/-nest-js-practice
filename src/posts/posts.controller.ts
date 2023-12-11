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
import { DemoPipePipe } from '../common/pipe/demo-pipe/demo-pipe.pipe';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getAll(@Req() req, @User('', DemoPipePipe) user) {
    console.log('req.user', req.user);
    console.log('user', user);
    return await this.postsService.getAll();
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(DemoRoleGuard)
  @Roles('member', 'guest')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: Partial<CreatePostDto>,
  ) {
    return await this.postsService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.postsService.delete(id);
  }
}
