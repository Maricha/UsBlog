import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from '../entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findById(id: number): Promise<Post> {
    return await this.postsRepository.findOne(id);
  }

  async create(postData): Promise<Post> {
    const post = new Post();
    post.title = postData.title;
    post.text = postData.text;
    return await this.postsRepository.save(post);
  }
}