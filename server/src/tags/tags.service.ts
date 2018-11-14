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
    const tags = await this.tagsRepository
    .createQueryBuilder('tag')
    .cache(true)
    .getMany();
    return tags;
  }

  async create(tagData): Promise<Tag> {
    const tag = new Tag();
    tag.value = tagData.value;
    tag.label = tagData.label;
    return await this.tagsRepository.save(tag);
  }

  async findAllByPostId(postId: number): Promise<Tag[]> {
    return await this.tagsRepository.find({ relations: ['posts'] });
  }
}