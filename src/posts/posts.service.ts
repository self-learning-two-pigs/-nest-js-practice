import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './posts.entity';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  posts: Post[] = [];
  index = 1;

  create(post: CreatePostDto): Post {
    this.index = this.index + 1;
    const newPost = {
      ...post,
      id: this.index,
    };
    this.posts = [...this.posts, newPost];
    return newPost;
  }

  getAll(): Post[] {
    return this.posts;
  }

  getById(id: number): Post {
    const result = this.posts.find((post) => post.id === id);
    if (result) {
      return result;
    }
    throw new NotFoundException('not found');
  }

  update(id: number, updates: Partial<Post>) {
    this.posts = this.posts.map((post) =>
      post.id === id ? { ...post, ...updates } : post,
    );
  }

  delete(id: number) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
