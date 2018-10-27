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
    const x = await this.commentsRepository.find({
      where: { post: postId },
    });
    return x;
  }

  async create(commentData): Promise<Comment> {
    const comment = new Comment();
    comment.authorName = commentData.authorName;
    comment.content = commentData.content;
    comment.post = commentData.postId;
    return await this.commentsRepository.save(comment);
  }
}