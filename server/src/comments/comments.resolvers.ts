import {
  Args,
  Query,
  Resolver,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { CommentsService } from './comments.service';
import { Comment } from '../entities/comments.entity';

const pubSub = new PubSub();

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
    pubSub.publish('commentAdded', { commentAdded: createdComment });
    return createdComment;
  }

  @Mutation('deleteComment')
  async delete(@Args('id') id: any): Promise<any> {
    return await this.commentsService.destroy(id);
  }

  @Subscription('commentAdded')
  commentAdded() {
    return {
      subscribe: () => pubSub.asyncIterator('commentAdded'),
    };
  }
}