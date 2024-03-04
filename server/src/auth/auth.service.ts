import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Messages } from 'src/messages/messages.enum';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PasswordsDoNotMatchException } from './exceptions/passwords-dont-match.exception';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.getByEmail(signInDto.email);

    if (bcrypt.compare(signInDto.password, user.password)) {
      return {
        message: Messages.LoggedIn,
      };
    } else {
      throw new WrongPasswordException();
    }
  }

  async signUp(signUpDto: any) {
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new PasswordsDoNotMatchException();
    }
    const createUserDto: CreateUserDto = {
      name: signUpDto.name,
      email: signUpDto.email,
      password: await bcrypt.hash(signUpDto.password, 10),
      photo: signUpDto.photo,
    };

    return this.userService.create(createUserDto);
  }
}
