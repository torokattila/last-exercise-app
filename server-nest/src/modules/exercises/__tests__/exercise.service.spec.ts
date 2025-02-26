import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { mockExercise } from '../../../../test/mock/mock-exercise';
import { mockExerciseType } from '../../../../test/mock/mock-exercise-type';
import { mockUser } from '../../../../test/mock/mock-user';
import { ExerciseType } from '../../exercise-types/entities/exercise-type.entity';
import { ExerciseTypeService } from '../../exercise-types/exercise-types.service';
import { User } from '../../users/entities/user.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { Exercise } from '../entities/exercise.entity';
import { ExerciseService } from '../exercises.service';

const mockExerciseRepository = {
  create: jest.fn().mockResolvedValue(mockExercise),
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

const mockUserRepository = {
  save: jest.fn().mockResolvedValue(mockUser),
  findOne: jest.fn().mockResolvedValue(mockUser),
  find: jest.fn().mockResolvedValue([mockUser]),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ExerciseService', () => {
  let service: ExerciseService;

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
          useValue: mockUserRepository,
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an exercise', async () => {
      const dto: CreateExerciseDto = {
        name: 'Push-ups',
        userId: mockUser.id,
      };

      const result = await service.create(dto);
      expect(result).toEqual(mockExercise);
      expect(mockExerciseRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(dto),
      );
    });
  });

  describe('findById', () => {
    it('should return an exercise if found', async () => {
      const result = await service.findById(mockExercise.id);
      expect(result).toEqual(mockExercise);
      expect(mockExerciseRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: mockExercise.id,
          },
        }),
      );
    });

    it('should throw NotFoundException if exercise not found', async () => {
      mockExerciseRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findById(mockExercise.id + 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
