/* eslint-disable @typescript-eslint/unbound-method */
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { mockUser } from '../../../../test/mock/mock-user';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  const mockUsersService = {
    findOneByEmail: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(mockUser),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockAccessToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and return tokens', async () => {
      const registerDto: RegisterDto = {
        email: mockUser.email,
        firstName: mockUser.firstname,
        lastName: mockUser.lastname,
        password: 'password123',
        passwordConfirm: 'password123',
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      const result = await authService.register(registerDto);

      expect(result).toEqual({
        accessToken: 'mockAccessToken',
        refreshToken: 'mockAccessToken',
      });
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(
        registerDto.email,
      );
      expect(usersService.create).toHaveBeenCalledWith({
        email: registerDto.email,
        password: 'hashedPassword',
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
      });
    });

    it('should throw BadRequestException if passwords do not match', async () => {
      const registerDto: RegisterDto = {
        email: mockUser.email,
        firstName: mockUser.firstname,
        lastName: mockUser.lastname,
        password: 'password123',
        passwordConfirm: 'wrongPassword',
      };

      await expect(authService.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if email is already in use', async () => {
      mockUsersService.findOneByEmail.mockResolvedValueOnce(mockUser);

      const registerDto: RegisterDto = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        passwordConfirm: 'password123',
      };

      await expect(authService.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    it('should login a user and return tokens', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const loginDto: LoginDto = {
        email: mockUser.email,
        password: mockUser.password,
      };

      const result = await authService.login(loginDto);

      expect(result).toEqual({
        accessToken: 'mockAccessToken',
        refreshToken: 'mockAccessToken',
      });
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      mockUsersService.findOneByEmail.mockResolvedValueOnce(null);

      const loginDto: LoginDto = {
        email: mockUser.email,
        password: mockUser.password,
      };

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const loginDto: LoginDto = {
        email: mockUser.email,
        password: 'wrongPassword',
      };

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
