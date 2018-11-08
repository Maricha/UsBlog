import { Module } from '@nestjs/common';

import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolvers';

@Module({
  imports: [],
  providers: [ContactService, ContactResolver],
})
export class ContactModule {}
