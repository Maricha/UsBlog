import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserRegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  first_name: string;
}

export class UserRO {
  id: number;
  email: string;
  last_name: string;
  first_name: string;
  token?: string;
}