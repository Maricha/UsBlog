import {
  Args,
  Query,
  Resolver,
  Parent,
  ResolveProperty,
  Mutation,
} from '@nestjs/graphql';

import { Post } from '../entities/posts.entity';
import { Tag } from '../entities/tags.entity';
import { Comment } from '../entities/comments.entity';

import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';
import { TagsService } from '../tags/tags.service';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
    private readonly tagsService: TagsService,
  ) {}

  @Query('post')
  async post(@Args('id') id: number) {
    return await this.postsService.findById(id);
  }

  @Query('getPosts')
  async getPosts() {
    return await this.postsService.findAll();
  }

  @ResolveProperty('comments')
  async comments(@Parent() post): Promise<Comment[]> {
    const { id } = post;
    return await this.commentsService.findAllByPostId(id);
  }

  @ResolveProperty('tags')
  async tags(@Parent() post): Promise<Tag[]> {
    const { id } = post;
    return await this.postsService.findTagsForPost(id);
  }

  @Mutation('createPost')
  async createPost(@Args('createPostInput') args: any): Promise<Post> {
    const createdPost = await this.postsService.create(args);
    return createdPost;
  }
}