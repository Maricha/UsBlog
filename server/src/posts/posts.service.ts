import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from '../entities/posts.entity';
import { Tag } from '../entities/tags.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async findById(id: number): Promise<Post> {
    return await this.postsRepository.findOne(id);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findTagsForPost(id: number): Promise<Tag[]> {
    const x = await this.postsRepository.find({
      relations: ['tags'],
      where: {id},
    });
    const tags = x[0].tags;
    return tags;
  }

  async create(postData): Promise<Post> {
    const post = new Post();
    post.title = postData.title;
    post.text = postData.text;
    post.tags = postData.tags;

    const tags = await this.tagsRepository.find({
      id: In(postData.tagsId),
    });

    post.tags = tags;
    return await this.postsRepository.save(post);
  }
}