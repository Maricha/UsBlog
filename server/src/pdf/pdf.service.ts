import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from '../entities/posts.entity';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) { }
  async getDataForPDF(): Promise<any> {
    const postList = await this.postsRepository
    .createQueryBuilder('posts')
    .select(['posts.id', 'posts.title', 'posts.createdAt', 'posts.id'])
    .leftJoinAndSelect('posts.comments', 'comments')
    .loadRelationCountAndMap('posts.comments', 'posts.comments')
    .getMany();
    return postList;
  }

}