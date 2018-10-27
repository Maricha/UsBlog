import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from '../entities/tags.entity';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsService, TagsResolver],
})
export class TagsModule {}
