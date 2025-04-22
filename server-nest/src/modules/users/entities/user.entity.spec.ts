import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, Repository } from 'typeorm';
import { getDatabaseConfig } from '../../../config/database.config';
import { ExerciseType } from '../../exercise-types/entities/exercise-type.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { User } from './user.entity';
dotenv.config();

describe('User Entity', () => {
  let dataSource: DataSource;
  let userRepository: Repository<User>;
  let exerciseRepository: Repository<Exercise>;
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  beforeAll(async () => {
    jest.setTimeout(30000);

    try {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            ...getDatabaseConfig(),
            entities: [User, Exercise, ExerciseType],
            synchronize: true,
          }),
          TypeOrmModule.forFeature([User, Exercise, ExerciseType]),
        ],
      }).compile();

      dataSource = module.get<DataSource>(DataSource);
      userRepository = module.get<Repository<User>>(getRepositoryToken(User));
      exerciseRepository = module.get<Repository<Exercise>>(
        getRepositoryToken(Exercise),
      );
    } catch (error) {
      console.error('Error setting up the database connection:', error);
      throw error;
    }
  });

  afterEach(async () => {
    // Restore original environment variables after each test
    process.env = originalEnv;
    await exerciseRepository.createQueryBuilder().delete().execute();
    await userRepository.createQueryBuilder().delete().execute();
  });

  afterAll(async () => {
    if (dataSource) {
      await dataSource.destroy();
    }
  });

  it('should define all properties correctly', async () => {
    const user = new User();
    user.email = 'test@example.com';
    user.password = 'securepassword';
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.exerciseHistory = [{ date: '2023-01-01', exerciseId: 1 }];

    const savedUser = await userRepository.save(user);
    const foundUser = await userRepository.findOneBy({ id: savedUser.id });

    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe('test@example.com');
    expect(foundUser?.password).toBe('securepassword');
    expect(foundUser?.firstName).toBe('John');
    expect(foundUser?.lastName).toBe('Doe');
    expect(foundUser?.exerciseHistory).toEqual([
      { date: '2023-01-01', exerciseId: 1 },
    ]);
  });

  it('should enforce unique constraint on email', async () => {
    const user1 = new User();
    user1.email = 'unique@example.com';
    user1.password = 'password1';
    user1.firstName = 'User1';
    user1.lastName = 'Test1';

    const user2 = new User();
    user2.email = 'unique@example.com'; // Same email as user1
    user2.password = 'password2';
    user2.firstName = 'User2';
    user2.lastName = 'Test2';

    await userRepository.save(user1);

    await expect(userRepository.save(user2)).rejects.toThrow();
  });

  it('should handle @OneToMany relationship with exercises', async () => {
    const user = new User();
    user.email = 'onetomany@example.com';
    user.password = 'password';
    user.firstName = 'John';
    user.lastName = 'Doe';

    const exercise1 = new Exercise();
    exercise1.name = 'Exercise 1';
    exercise1.user = user;

    const exercise2 = new Exercise();
    exercise2.name = 'Exercise 2';
    exercise2.user = user;

    await userRepository.save(user);
    await exerciseRepository.save([exercise1, exercise2]);

    const foundUser = await userRepository.findOne({
      where: { id: user.id },
      relations: ['exercises'],
    });

    expect(foundUser).toBeDefined();
    expect(foundUser?.exercises).toHaveLength(2);
    expect(foundUser?.exercises.map((e) => e.name)).toEqual([
      'Exercise 1',
      'Exercise 2',
    ]);
  });

  it('should handle @OneToOne relationship with lastExercise', async () => {
    const user = new User();
    user.email = 'onetoone@example.com';
    user.password = 'password';
    user.firstName = 'John';
    user.lastName = 'Doe';

    await userRepository.save(user);

    const exercise = new Exercise();
    exercise.name = 'Last Exercise';
    exercise.user = user;

    await exerciseRepository.save(exercise);

    user.lastExercise = exercise;
    await userRepository.save(user);

    const foundUser = await userRepository.findOne({
      where: { id: user.id },
      relations: ['lastExercise'],
    });

    expect(foundUser).toBeDefined();
    expect(foundUser?.lastExercise).toBeDefined();
    expect(foundUser?.lastExercise?.name).toBe('Last Exercise');
  });

  it('should default exerciseHistory to an empty array', async () => {
    const user = new User();
    user.email = 'default@example.com';
    user.password = 'password';
    user.firstName = 'John';
    user.lastName = 'Doe';

    const savedUser = await userRepository.save(user);
    const foundUser = await userRepository.findOneBy({ id: savedUser.id });

    expect(foundUser).toBeDefined();
    expect(foundUser?.exerciseHistory).toEqual([]);
  });
});
