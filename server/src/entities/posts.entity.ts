import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Tag } from './tags.entity';
import { Comment } from './comments.entity';
import { User } from './users.entity';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(type => User, user => user.posts)
    user: User;
}