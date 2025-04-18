/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth-guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    authGuard = new AuthGuard();
  });

  describe('canActivate', () => {
    it('should call super.canActivate with provided context', () => {
      const mockContext = {} as ExecutionContext;
      const superCanActivateSpy = jest
        .spyOn(AuthGuard.prototype, 'canActivate')
        .mockReturnValue(true);

      const result = authGuard.canActivate(mockContext);

      expect(superCanActivateSpy).toHaveBeenCalledWith(mockContext);
      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should return the user if no error occurs', () => {
      const user = {
        id: 1,
        email: 'testuser@example.com',
        firstName: 'Test',
        lastName: 'User',
      };
      const result: typeof user = authGuard.handleRequest(
        null,
        user,
      ) as typeof user;

      expect(result).toBe(user);
    });

    it('should throw UnauthorizedException if an error occurs', () => {
      const error = new Error('Error');

      expect(() => authGuard.handleRequest(error, null)).toThrow(
        UnauthorizedException,
      );
      expect(() => authGuard.handleRequest(error, null)).toThrow(
        'User is not authenticated',
      );
    });

    it('should throw UnauthorizedException if user is null', () => {
      expect(() => authGuard.handleRequest(null, null)).toThrow(
        UnauthorizedException,
      );
      expect(() => authGuard.handleRequest(null, null)).toThrow(
        'User is not authenticated',
      );
    });

    it('should throw UnauthorizedException if user is undefined', () => {
      expect(() => authGuard.handleRequest(null, undefined)).toThrow(
        UnauthorizedException,
      );
      expect(() => authGuard.handleRequest(null, undefined)).toThrow(
        'User is not authenticated',
      );
    });

    it('should throw UnauthorizedException if both error and user are falsy', () => {
      expect(() => authGuard.handleRequest(undefined, undefined)).toThrow(
        UnauthorizedException,
      );
      expect(() => authGuard.handleRequest(undefined, undefined)).toThrow(
        'User is not authenticated',
      );
    });

    it('should handle edge case where error is null and user is undefined', () => {
      expect(() => authGuard.handleRequest(null, undefined)).toThrow(
        UnauthorizedException,
      );
    });

    it('should handle edge case where error is undefined and user is null', () => {
      expect(() => authGuard.handleRequest(undefined, null)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
