/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../../../types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

        if (typeof token !== 'string') {
          throw new Error('Invalid token format');
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env?.JWT_TOKEN_SECRET ?? 'secret',
    });
  }

  validate(payload: JwtPayload, done: VerifiedCallback): void {
    try {
      if (!payload.sub || !payload.email) {
        throw new Error('Invalid token payload');
      }
      done(null, { userId: payload.sub, email: payload.email });
    } catch (error: any) {
      done(error, false);
    }
  }
}
