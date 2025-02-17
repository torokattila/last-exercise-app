/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { mockUser } from '../../../../test/mock/mock-user';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({
      accessToken: 'mockedAccessToken',
      refreshToken: 'mockedRefreshToken',
    }),
    register: jest.fn().mockResolvedValue({
      accessToken: 'mockedAccessToken',
      refreshToken: 'mockedRefreshToken',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return access and refresh tokens', async () => {
      const loginDto: LoginDto = {
        email: mockUser.email,
        password: 'password123',
      };

      const result = await authController.login(loginDto);

      expect(result).toEqual({
        accessToken: 'mockedAccessToken',
        refreshToken: 'mockedRefreshToken',
      });
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
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

      const result = await authController.register(registerDto);

      expect(result).toEqual({
        accessToken: 'mockedAccessToken',
        refreshToken: 'mockedRefreshToken',
      });

      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });
  });
});
