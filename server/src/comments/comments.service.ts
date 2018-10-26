import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from '../entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async findById(id: number): Promise<Comment> {
    return await this.commentsRepository.findOne(id);
  }

  async findAllByPostId(postId: number): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { postId },
    });
  }
}