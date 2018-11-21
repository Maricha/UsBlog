import {
  Resolver,
  Query,
  Args,
  Mutation,
} from '@nestjs/graphql';

import { UserService } from './users.service';
import { UserRegisterDTO, UserLoginDTO } from './dto';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query()
  async user(@Args('email') email: string) {
    return await this.userService.read(email);
  }

  @Mutation()
  async login(
    @Args('loginInput') args: UserLoginDTO) {
    return await this.userService.login(args);
  }

  @Mutation()
  async register(@Args('registerInput') args: UserRegisterDTO) {
    return await this.userService.register(args);
  }
}