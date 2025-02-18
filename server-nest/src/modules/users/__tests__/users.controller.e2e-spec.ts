/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { mockUser } from '../../../../test/mock/mock-user';
import { AppModule } from '../../../app.module';
import { RegisterDto } from '../../auth/dto/register.dto';
import { UpdateLastExerciseDto } from '../dto/update-last-exercise.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

const BASE_ROUTE = '/users';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let accessToken: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    dbConnection = moduleFixture.get<DataSource>(DataSource);

    const registerDto: RegisterDto = {
      email: mockUser.email,
      firstName: 'Test',
      lastName: 'User',
      password: 'TestPassword123',
      passwordConfirm: 'TestPassword123',
    };

    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(HttpStatus.CREATED);

    accessToken = registerResponse.body.accessToken;

    const userResponse = await request(app.getHttpServer())
      .get(BASE_ROUTE)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    userId = userResponse.body.id;
  });

  it('should retrieve a user by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`${BASE_ROUTE}/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toMatchObject({
      id: userId,
      email: mockUser.email,
      firstname: 'Test',
      lastname: 'User',
    });
  });

  it('should update user details', async () => {
    const updateUserDto: UpdateUserDto = {
      firstname: 'Updated',
      lastname: 'Name',
      email: mockUser.email,
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
      .set('Authorization', `Bearer ${userId}`)
      .expect(HttpStatus.NO_CONTENT);

    await request(app.getHttpServer())
      .get(`${BASE_ROUTE}/${userId}`)
      .set('Authorization', `Bearer ${userId}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await dbConnection.destroy();
    await app.close();
  });
});
