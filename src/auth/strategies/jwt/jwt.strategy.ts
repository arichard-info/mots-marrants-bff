import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        return req?.cookies?.[jwtConstants.cookieName];
      },
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_AUTH_SECRET}`,
    });
  }

  async validate(payload: any) {
    console.log('///payload', payload);
    return payload;
  }
}
