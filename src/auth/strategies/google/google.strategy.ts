import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: `${process.env.FRONT_URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      googleId: profile.id,
      username: profile.displayName,
      email: profile?.emails?.[0]?.value,
      accessToken,
    };
    done(null, user);
  }
}

/*
profile {
  id: '106902719590946479618',
  displayName: 'Kalagounet',
  name: { familyName: undefined, givenName: 'Kalagounet' },
  emails: [ { value: 'gounet80@gmail.com', verified: true } ],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a-/AOh14Ghf7nJJaVxcAlMJBHtmDMopOJ055LyRxOopHXF-_g=s96-c'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "106902719590946479618",\n' +
    '  "name": "Kalagounet",\n' +
    '  "given_name": "Kalagounet",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a-/AOh14Ghf7nJJaVxcAlMJBHtmDMopOJ055LyRxOopHXF-_g\\u003ds96-c",\n' +
    '  "email": "gounet80@gmail.com",\n' +
    '  "email_verified": true,\n' +
    '  "locale": "fr"\n' +
    '}',
  _json: {
    sub: '106902719590946479618',
    name: 'Kalagounet',
    given_name: 'Kalagounet',
    picture: 'https://lh3.googleusercontent.com/a-/AOh14Ghf7nJJaVxcAlMJBHtmDMopOJ055LyRxOopHXF-_g=s96-c',
    email: 'gounet80@gmail.com',
    email_verified: true,
    locale: 'fr'
  }
}
*/
