import { Injectable, Inject, Response } from '@nestjs/common';

@Injectable()
export class ContactService {
  constructor(
    @Inject('MailerProvider') private readonly mailerProvider,
  ) {}

  async sendMail(args: any): Promise<any> {
    const {
      senderEmail,
      title,
      content,
      name,
    } = args;
    try {
      await this.mailerProvider.sendMail({
        to: 'maricha177@gazeta.pl',
        from: 'noreply@blogus.com',
        subject: title,
        template: 'contact',
        context: {
          name,
          content,
          email: senderEmail,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}