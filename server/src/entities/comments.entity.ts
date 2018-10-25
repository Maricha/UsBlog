import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Post } from './posts.entity';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorName: string;

    @Column()
    content: string;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;
}