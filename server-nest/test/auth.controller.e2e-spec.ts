/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { mockUser } from './mock/mock-user';
import { AppModule } from '../src/app.module';
import { LoginDto } from '../src/modules/auth/dto/login.dto';
import { RegisterDto } from '../src/modules/auth/dto/register.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return tokens', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: mockUser.email,
          firstName: 'Test',
          lastName: 'User',
          password: 'password123',
          passwordConfirm: 'password123',
        } as RegisterDto);

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a user and return tokens', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: mockUser.email,
          firstName: 'Test',
          lastName: 'User',
          password: 'password123',
          passwordConfirm: 'password123',
        } as RegisterDto);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: mockUser.email, password: 'password123' } as LoginDto);

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });
  });
});
