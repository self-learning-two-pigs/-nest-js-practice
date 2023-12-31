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
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { HttpExceptionFilter } from '../common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from '../common/interceptor/transform/transform.interceptor';
import { User } from '../common/decorator/user/user.decorator';
import { DemoPipePipe } from '../common/pipe/demo-pipe/demo-pipe.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User as UserEntity } from '../user/user.entity';
import { DemoRoleGuard } from '../common/guard/demo-role/demo-role.guard';
import { Roles } from '../common/decorator/roles/roles.decorator';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPostDto: CreatePostDto, @User() user: UserEntity) {
    return await this.postsService.create(createPostDto, user);
  }

  @Get()
  @UseInterceptors(TransformInterceptor, ClassSerializerInterceptor)
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
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updates: UpdatePostDto,
  ) {
    return await this.postsService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.postsService.delete(id);
  }
}
