import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Post } from './posts.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() first_name: string;

  @Column() last_name: string;

  @Column() email: string;

  @Column() role: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}