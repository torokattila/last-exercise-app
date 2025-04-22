import { JwtStrategy } from './jwt.strategy';
import { JwtPayload } from '../../../types/jwt-payload.interface';
import * as passportJwt from 'passport-jwt';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(passportJwt.ExtractJwt, 'fromAuthHeaderAsBearerToken')
      .mockReturnValue('mockedJwtFromRequest' as any);

    jwtStrategy = new JwtStrategy();
  });

  describe('constructor', () => {
    it('should be initialized with the correct options', () => {
      expect(
        passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken,
      ).toHaveBeenCalled();
    });
  });

  describe('validate', () => {
    let done: jest.Mock;

    beforeEach(() => {
      done = jest.fn();
    });

    it('should call done with the user object when payload is valid', () => {
      const payload: JwtPayload = { sub: 123, email: 'test@example.com' };

      jwtStrategy.validate(payload, done);

      expect(done).toHaveBeenCalledWith(null, {
        userId: 123,
        email: 'test@example.com',
      });
    });

    it('should throw an error if payload is missing "sub"', () => {
      const payload: JwtPayload = { sub: NaN, email: 'test@example.com' };

      jwtStrategy.validate(payload, done);

      expect(done).toHaveBeenCalledWith(expect.any(Error), false);
      const error = (done.mock.calls[0] as [Error, boolean])[0];
      expect(error.message).toBe('Invalid token payload');
    });

    it('should throw an error if payload is missing "email"', () => {
      const payload: JwtPayload = { sub: 123, email: '' };

      jwtStrategy.validate(payload, done);

      expect(done).toHaveBeenCalledWith(expect.any(Error), false);
      const error = (done.mock.calls[0] as [Error, boolean])[0];
      expect(error.message).toBe('Invalid token payload');
    });

    it('should throw an error if payload is null', () => {
      jwtStrategy.validate(null as unknown as JwtPayload, done);

      expect(done).toHaveBeenCalledWith(expect.any(Error), false);
      const error = (done.mock.calls[0] as [Error, boolean])[0];
      expect(error.message).toBe('Invalid token payload');
    });

    it('should throw an error if payload is undefined', () => {
      jwtStrategy.validate(undefined as unknown as JwtPayload, done);

      expect(done).toHaveBeenCalledWith(expect.any(Error), false);
      const error = (done.mock.calls[0] as [Error, boolean])[0];
      expect(error.message).toBe('Invalid token payload');
    });
  });
});
