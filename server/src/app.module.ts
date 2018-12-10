import {
  Module,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nest-modules/mailer';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      tracing: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UsersModule,
    PostsModule,
    TagsModule,
    CommentsModule,
    ContactModule,
    MailerModule.forRoot(),
    ConfigModule.load(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  constructor(
  ) {}
}
