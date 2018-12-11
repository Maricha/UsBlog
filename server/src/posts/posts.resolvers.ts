import {
  Args,
  Query,
  Resolver,
  Parent,
  ResolveProperty,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { Post } from '../entities/posts.entity';
import { Tag } from '../entities/tags.entity';
import { Comment } from '../entities/comments.entity';

import { PostsService } from './posts.service';
import { CommentsService } from '../comments/comments.service';
import { TagsService } from '../tags/tags.service';
import { AuthGuard } from '../shared/auth.guard';

const pubSub = new PubSub();

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

  @Query('getPosts')
  async getPosts() {
    return await this.postsService.findAll();
  }

  @Query('getPostsByTag')
  async getPostsByTag(@Args('tag') tag: string) {
    return await this.postsService.findAllByTag(tag);
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
  @UseGuards(new AuthGuard())
  async createPost(@Args('createPostInput') args: any): Promise<Post> {
    const createdPost = await this.postsService.create(args);
    return createdPost;
  }

  @Mutation('updatePost')
  @UseGuards(new AuthGuard())
  async updatePost(@Args('updatePostInput') args: any): Promise<Post> {
    const updatedPost = await this.postsService.update(args);
    return updatedPost;
  }

  @Mutation('deletePost')
  @UseGuards(new AuthGuard())
  async deletePost(@Args('id') id): Promise<Post> {
    const post = await this.postsService.destroy(id);
    pubSub.publish('postDeleted', { postDeleted: post });
    return post;
  }

  @Subscription('postDeleted')
  postDeleted() {
    return {
      subscribe: () => pubSub.asyncIterator('postDeleted'),
    };
  }
}