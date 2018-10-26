import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Tag } from '../entities/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  async create(tagData): Promise<Tag> {
    const tag = new Tag();
    tag.name = tagData.name;
    return await this.tagsRepository.save(tag);
  }
}