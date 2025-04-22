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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_SECRET ?? 'secret',
    });
  }

  validate(payload: JwtPayload, done: VerifiedCallback) {
    if (!payload || typeof payload !== 'object') {
      return done(new Error('Invalid token payload'), false);
    }

    const { sub, email } = payload;

    if (!sub || !email) {
      return done(new Error('Invalid token payload'), false);
    }

    return done(null, { userId: sub, email });
  }
}
