import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../entities/comments.entity';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
