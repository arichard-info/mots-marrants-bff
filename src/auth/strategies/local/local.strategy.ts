import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './../../../users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException();
    if (!compare(user.password, password)) throw new BadRequestException();
    return user;
  }
}
