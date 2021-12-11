import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LocalSignupDto } from './dto/local-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
      .cookie('access_token', accessToken, {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  }

  async login(user: any, res) {
    const accessToken = this.jwtService.sign(user);
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        domain: 'localhost', // your domain here!
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  }
}
