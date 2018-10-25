import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from '../entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [],
})
export class TagsModule {}
