import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PdfController } from './pdf.controller';

@Module({
  imports: [],
  controllers: [
    PdfController,
  ],
})
export class PdfModule { }
