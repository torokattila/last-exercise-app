/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { RegisterDto } from '../src/modules/auth/dto/register.dto';
import { UpdateLastExerciseDto } from '../src/modules/users/dto/update-last-exercise.dto';
import { UpdatePasswordDto } from '../src/modules/users/dto/update-password.dto';
import { UpdateUserDto } from '../src/modules/users/dto/update-user.dto';
import { mockExercise } from './mock/mock-exercise';
import { mockUser2 } from './mock/mock-user';

const BASE_ROUTE = '/users';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let accessToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
    await dataSource.query(
      'TRUNCATE TABLE users, exercises RESTART IDENTITY CASCADE',
    );

    const registerDto: RegisterDto = {
      email: mockUser2.email,
      firstname: 'Test',
      lastname: 'User',
      password: 'TestPassword123',
      passwordConfirm: 'TestPassword123',
    };

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(HttpStatus.CREATED);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser2.email, password: 'TestPassword123' } as LoginDto)
      .expect(HttpStatus.OK);

    accessToken = loginResponse.body.token;
    userId = loginResponse.body.user.id;

    await request(app.getHttpServer())
      .post('/exercises')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockExercise)
      .expect(HttpStatus.CREATED);
  });

  it('should retrieve a user by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`${BASE_ROUTE}/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toMatchObject({
      id: userId,
      email: mockUser2.email,
      firstname: 'Test',
      lastname: 'User',
    });
  });

  it('should update user details', async () => {
    const updateUserDto: UpdateUserDto = {
      firstname: 'Updated',
      lastname: 'Name',
      email: mockUser2.email,
    };

    const response = await request(app.getHttpServer())
      .put(`${BASE_ROUTE}/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateUserDto)
      .expect(HttpStatus.OK);

    expect(response.body).toMatchObject({
      id: userId,
      firstname: 'Updated',
      lastname: 'Name',
    });
  });

  it('should update the user password', async () => {
    const updatePasswordDto: UpdatePasswordDto = {
      currentPassword: 'TestPassword123',
      newPassword: 'NewPassword123',
      confirmPassword: 'NewPassword123',
    };

    await request(app.getHttpServer())
      .put(`${BASE_ROUTE}/${userId}/password`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatePasswordDto)
      .expect(HttpStatus.OK);
  });

  it('should update the last exercise of the user', async () => {
    const updateLastExerciseDto: UpdateLastExerciseDto = {
      exerciseId: 1,
    };

    const response = await request(app.getHttpServer())
      .put(`${BASE_ROUTE}/${userId}/last-exercise`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateLastExerciseDto)
      .expect(HttpStatus.OK);

    expect(response.body.lastExerciseId).toBe(1);
  });

  it('should delete the user', async () => {
    await request(app.getHttpServer())
      .delete(`${BASE_ROUTE}/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);

    await request(app.getHttpServer())
      .get(`${BASE_ROUTE}/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
