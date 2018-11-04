import {
  Args,
  Query,
  Resolver,
  Mutation,
} from '@nestjs/graphql';

import { CommentsService } from './comments.service';
import { Comment } from '../entities/comments.entity';

@Resolver('Comment')
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Query('comment')
  async comment(@Args('id') id: number): Promise<Comment> {
    return await this.commentsService.findById(id);
  }

  @Query('getCommentsForPost')
  async getComments(@Args('id') id: number): Promise<Comment[]> {
    return await this.commentsService.findAllByPostId(id);
  }

  @Mutation('createComment')
  async create(@Args('createCommentInput') args: any): Promise<Comment> {
    const createdComment = await this.commentsService.create(args);
    return createdComment;
  }
}