import {
  Args,
  Resolver,
  Mutation,
} from '@nestjs/graphql';

import { ContactService } from './contact.service';

@Resolver('Contact')
export class ContactResolver {
  constructor(
    private readonly contactService: ContactService,
  ) {}

  @Mutation('sendEmail')
  async send(@Args('sendContactInput') args: any): Promise<any> {
    return await this.contactService.sendMail(args);
  }
}