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

  async findAllByTag(tag: string): Promise<Post[]> {
    const posts = await this.postsRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.tags', 'tag')
    .where('tag.value = :value', { value: tag })
    .cache(true)
    .orderBy('post.createdAt', 'DESC')
    .getMany();
    return posts;
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findTagsForPost(id: number): Promise<Tag[]> {
    const postList = await this.postsRepository.find({
      relations: ['tags'],
      where: {id},
    });
    const tags = postList[0].tags;
    return tags;
  }

  async create(postData): Promise<Post> {
    const post = new Post();
    post.title = postData.title;
    post.text = postData.text;
    post.tags = postData.tags;
    post.image = postData.image;
    post.subtitle = postData.subtitle;

    const tags = await this.tagsRepository.find({
      id: In(postData.tagsId),
    });

    post.tags = tags;
    return await this.postsRepository.save(post);
  }

  async update(postData): Promise<Post> {
    const post = await this.findById(postData.id);
    const updated = Object.assign(post, postData);

    if (postData.tagsId) {
      const tags = await this.tagsRepository.find({
        id: In(postData.tagsId),
      });
      updated.tags = tags;
    }
    return await this.postsRepository.save(updated);
  }

  async destroy(id: string) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    await this.postsRepository.remove(post);
    return post;
  }
}