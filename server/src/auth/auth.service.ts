import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { Messages } from 'src/messages/messages.enum';
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PasswordsDoNotMatchException } from './exceptions/passwords-dont-match.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.getByEmail(signInDto.email);

    if (!(await bcrypt.compare(signInDto.password, user.password))) {
      throw new WrongPasswordException();
    }

    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      photo: user.photo,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      message: Messages.LoggedIn,
    };
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
