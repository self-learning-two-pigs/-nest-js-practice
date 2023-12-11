import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './posts.entity';
import { CreatePostDto } from './posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    await this.postRepository.save(post);
    return post;
  }

  async getAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async getById(id: number): Promise<Post> {
    const result = await this.postRepository.findOneBy({ id });
    if (result) {
      return result;
    }
    throw new NotFoundException('not found');
  }

  async update(id: number, updates: Partial<Post>) {
    return await this.postRepository.update(id, updates);
  }

  async delete(id: number) {
    await this.postRepository.delete(id);
  }
}
