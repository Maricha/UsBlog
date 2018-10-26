import {
  Args,
  Query,
  Resolver,
  Parent,
  ResolveProperty,
  Mutation,
} from '@nestjs/graphql';

import { Post } from '../entities/posts.entity';
import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Query('post')
  async post(@Args('id') id: number) {
    return await this.postsService.findById(id);
  }

  @ResolveProperty('comments')
  async posts(@Parent() post) {
    const { id } = post;
    return await this.commentsService.findAllByPostId(id);
  }

  @Mutation('createPost')
  async createPost(@Args('createPostInput') args: any): Promise<Post> {
    const createdPost = await this.postsService.create(args);
    return createdPost;
  }
}