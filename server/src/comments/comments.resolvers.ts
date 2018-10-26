import {
  Args,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { CommentsService } from './comments.service';

@Resolver('Comment')
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Query('comment')
  async comment(@Args('id') id: number) {
    return await this.commentsService.findById(id);
  }
}