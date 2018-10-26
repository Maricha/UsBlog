import {
  Args,
  Query,
  Resolver,
  Mutation,
} from '@nestjs/graphql';

import { Tag } from '../entities/tags.entity';
import { TagsService } from './tags.service';

@Resolver('Tag')
export class TagsResolver {
  constructor(
    private readonly tagsService: TagsService,
  ) {}

  @Query('tags')
  async tags() {
    return await this.tagsService.findAll();
  }

  @Mutation('createTag')
  async createTag(@Args('createTagInput') args: any): Promise<Tag> {
    const createdTag = await this.tagsService.create(args);
    return createdTag;
  }
}