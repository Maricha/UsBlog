import {
  Post,
  Get,
  Controller,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import * as path from 'path';
import { Response } from 'express';

import pdf from 'html-pdf';

import { pdfTemplate } from './template';

@Controller('pdf')
export class PdfController {
  constructor() { }

  @Post()
  generate(@Res() res: Response, @Body() params) {
    pdf.create(pdfTemplate(), {}).toFile('result.pdf', (err) => {
      if (err) {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
      res.status(HttpStatus.CREATED).send();
    });
  }

  @Get()
  get_pdf(@Res() res: Response) {
    res.sendFile('result.pdf', { root: path.join(__dirname, '../../') });
  }
}
