import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '../entities/posts.entity';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [
    PdfController,
  ],
  providers: [
    PdfService,
  ],
})
export class PdfModule { }
