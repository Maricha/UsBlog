import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../entities/posts.entity';
import { Comment } from '../entities/comments.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolvers';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Comment]),
  ],
  providers: [
    PostsService,
    CommentsService,
    PostsResolver,
  ],
})
export class PostsModule {}
