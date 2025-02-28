import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from '../exercises.controller';
import { ExerciseService } from '../exercises.service';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { Exercise } from '../entities/exercise.entity';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest } from '../../../types/authenticated-request';
import { mockExercise } from '../../../../test/mock/mock-exercise';

describe('ExerciseController', () => {
  let exerciseController: ExerciseController;
  let exerciseService: ExerciseService;

  const mockExerciseService = {
    create: jest.fn().mockResolvedValue(mockExercise),
    findById: jest.fn().mockResolvedValue(mockExercise),
    list: jest.fn().mockResolvedValue([mockExercise]),
    update: jest.fn().mockResolvedValue(mockExercise),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [
        {
          provide: ExerciseService,
          useValue: mockExerciseService,
        },
      ],
    }).compile();

    exerciseController = module.get<ExerciseController>(ExerciseController);
    exerciseService = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(exerciseController).toBeDefined();
  });
});
