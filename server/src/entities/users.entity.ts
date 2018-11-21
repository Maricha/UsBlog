import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { Post } from './posts.entity';
import { UserRO } from '../users/dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() first_name: string;

  @Column() last_name: string;

  @Column() email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token(): string {
    const { id, email } = this;

    return jwt.sign(
      {
        id,
        email,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const {
      id,
      email,
      token,
      first_name,
      last_name,
    } = this;
    const responseObject: UserRO = {
      id,
      last_name,
      first_name,
      email,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }
}