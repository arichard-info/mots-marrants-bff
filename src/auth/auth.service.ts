import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LocalSignupDto } from './dto/local-signup.dto';
import { jwtConstants } from './constants';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (compare(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    } else return null;
  }

  async signup(localSignupDto: LocalSignupDto, res) {
    if (
      !localSignupDto.password ||
      localSignupDto.password !== localSignupDto.passwordConfirm
    ) {
      return null;
    }
    const { passwordConfirm, ...createUserDto } = localSignupDto;
    const user = await this.usersService.create(createUserDto);

    const accessToken = this.jwtService.sign(user);
    res
      .cookie(jwtConstants.cookieName, accessToken, {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(
          Date.now() + 1000 * 60 * 60 * jwtConstants.expiration,
        ),
      })
      .send({ success: true });
  }

  async login(user: any, res) {
    const accessToken = this.jwtService.sign(user);
    res
      .cookie(jwtConstants.cookieName, accessToken, {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(
          Date.now() + 1000 * 60 * 60 * jwtConstants.expiration,
        ),
      })
      .send({ success: true });
  }

  async googleLogin(googleUser: any, res) {
    if (!googleUser) throw new Error('No user from google');
    const user = await this.usersService.syncProviderUser(googleUser);

    const accessToken = this.jwtService.sign(user);
    res
      .cookie(jwtConstants.cookieName, accessToken, {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(
          Date.now() + 1000 * 60 * 60 * jwtConstants.expiration,
        ),
      })
      .send({ success: true });
  }
}
