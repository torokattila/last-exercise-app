import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from '../exercises.service';
import { ExerciseTypeService } from '../../exercise-types/exercise-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseType } from '../../exercise-types/entities/exercise-type.entity';
import { ExerciseTypeModule } from '../../exercise-types/exercise-types.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { mockExercise } from '../../../../test/mock/mock-exercise';
import { mockExerciseType } from '../../../../test/mock/mock-exercise-type';

const mockExerciseRepository = {
  save: jest.fn().mockResolvedValue(mockExercise),
  findOne: jest.fn().mockResolvedValue(mockExercise),
  find: jest.fn().mockResolvedValue([mockExercise]),
  remove: jest.fn().mockResolvedValue(undefined),
};

const mockExerciseTypeRepository = {
  save: jest.fn().mockResolvedValue(mockExerciseType),
  findOne: jest.fn().mockResolvedValue(mockExerciseType),
  find: jest.fn().mockResolvedValue([mockExerciseType]),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ExerciseService', () => {
  let service: ExerciseService;
  let exerciseRepository: Repository<Exercise>;
  let exerciseTypeRepository: Repository<ExerciseType>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        ExerciseTypeService,
        {
          provide: getRepositoryToken(Exercise),
          useValue: mockExerciseRepository,
        },
        {
          provide: getRepositoryToken(ExerciseType),
          useValue: mockExerciseTypeRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {}, // Mock the DataSource dependency
        },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
    exerciseRepository = module.get<Repository<Exercise>>(
      getRepositoryToken(Exercise),
    );
    exerciseTypeRepository = module.get<Repository<ExerciseType>>(
      getRepositoryToken(ExerciseType),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
