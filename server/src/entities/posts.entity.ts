import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
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

    @Column({ nullable: true })
    subtitle: string;

    @Column()
    text: string;

    @OneToMany(type => Comment, comment => comment.post)
    @JoinColumn()
    comments: Comment[];

    @ManyToMany(type => Tag, tag => tag.posts)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}