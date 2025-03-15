/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { RegisterDto } from '../src/modules/auth/dto/register.dto';
import { CreateExerciseDto } from '../src/modules/exercises/dto/create-exercise.dto';
import { UpdateExerciseDto } from '../src/modules/exercises/dto/update-exercise.dto';
import { mockExercise2 } from './mock/mock-exercise';
import { mockUser3 } from './mock/mock-user';

const BASE_ROUTE = '/exercises';

describe('ExerciseController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let accessToken: string;
  let userId: number;
  let exerciseId: number;

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
      email: mockUser3.email,
      firstName: 'Test',
      lastName: 'User',
      password: 'TestPassword123',
      passwordConfirm: 'TestPassword123',
    };

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(HttpStatus.CREATED);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUser3.email, password: 'TestPassword123' } as LoginDto)
      .expect(HttpStatus.OK);

    accessToken = loginResponse.body.token;
    userId = loginResponse.body.user.id;
  });

  it('should create an exercise', async () => {
    const createExerciseDto: CreateExerciseDto = {
      name: mockExercise2.name,
      userId,
      exerciseTypes: [],
    };

    const response = await request(app.getHttpServer())
      .post(BASE_ROUTE)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createExerciseDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toMatchObject({
      name: mockExercise2.name,
      userId,
    });

    exerciseId = response.body.id;
  });

  it('should retrieve an exercise by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`${BASE_ROUTE}/${exerciseId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toMatchObject({
      id: exerciseId,
      name: mockExercise2.name,
      userId,
    });
  });

  it('should throw NotFoundException if exercise not found', async () => {
    await request(app.getHttpServer())
      .get(`${BASE_ROUTE}/${exerciseId + 1}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should list exercises for the user', async () => {
    const response = await request(app.getHttpServer())
      .get(BASE_ROUTE)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an exercise', async () => {
    const updateExerciseDto: UpdateExerciseDto = {
      name: 'Modified Push-ups',
      userId,
    };

    const response = await request(app.getHttpServer())
      .put(`${BASE_ROUTE}/${exerciseId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateExerciseDto)
      .expect(HttpStatus.OK);

    expect(response.body).toMatchObject({
      id: exerciseId,
      name: 'Modified Push-ups',
      userId,
    });
  });

  it('should delete an exercise', async () => {
    await request(app.getHttpServer())
      .delete(`${BASE_ROUTE}/${exerciseId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NO_CONTENT);

    await request(app.getHttpServer())
      .get(`${BASE_ROUTE}/${exerciseId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should now allow unauthorized access', async () => {
    const createExerciseDto: CreateExerciseDto = {
      name: 'Back + Shoulder',
      userId,
      exerciseTypes: [],
    };

    await request(app.getHttpServer())
      .post(BASE_ROUTE)
      .send(createExerciseDto)
      .expect(HttpStatus.UNAUTHORIZED);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });
});
