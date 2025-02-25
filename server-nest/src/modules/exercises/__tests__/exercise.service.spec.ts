/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExerciseService } from '../../exercises/exercises.service';
import { Exercise } from '../entities/exercise.entity';
import { mockExercise } from '../../../../test/mock/mock-exercise';

const mockExerciseRepository = {
  save: jest.fn().mockResolvedValue(mockExercise),
  findOne: jest.fn().mockResolvedValue(mockExercise),
  find: jest.fn().mockResolvedValue([mockExercise]),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        {
          provide: getRepositoryToken(Exercise),
          useValue: mockExerciseRepository,
        },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
