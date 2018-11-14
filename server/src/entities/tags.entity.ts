import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { Post } from '../entities/posts.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn() id: number;

  @Column()  value: string;
  @Column({nullable: true})  label: string;

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[];

}
