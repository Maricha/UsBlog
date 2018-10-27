import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../entities/posts.entity';
import { Comment } from '../entities/comments.entity';
import { Tag } from '../entities/tags.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolvers';
import { CommentsService } from '../comments/comments.service';
import { TagsService } from '../tags/tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Tag]),
  ],
  providers: [
    PostsService,
    CommentsService,
    PostsResolver,
    TagsService,
  ],
})
export class PostsModule {}
