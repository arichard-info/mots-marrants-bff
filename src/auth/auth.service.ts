import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LocalSignupDto } from './dto/local-signup.dto';
import { jwtConstants } from './constants';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(localSignupDto: LocalSignupDto, res) {
    if (
      !localSignupDto.password ||
      localSignupDto.password !== localSignupDto.passwordConfirm
    ) {
      return null;
    }
    const { passwordConfirm, ...createUserDto } = localSignupDto;
    const user = await this.usersService.create(createUserDto);
    return this.login(user, res);
  }

  async login(user: any, res) {
    delete user.password;
    const accessToken = this.jwtService.sign(user);
    res
      .cookie(jwtConstants.cookieName, accessToken, {
        signed: true,
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(
          Date.now() + 1000 * 60 * 60 * jwtConstants.expiration,
        ),
      })
      .send({ success: true });
  }
}
