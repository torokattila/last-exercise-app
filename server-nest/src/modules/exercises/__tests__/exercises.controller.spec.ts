/* eslint-disable @typescript-eslint/unbound-method */
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockExercise } from '../../../../test/mock/mock-exercise';
import { mockUser } from '../../../../test/mock/mock-user';
import { AuthenticatedRequest } from '../../../types/authenticated-request';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { ExerciseController } from '../exercises.controller';
import { ExerciseService } from '../exercises.service';

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

  describe('create', () => {
    it('should create an exercise', async () => {
      const createExerciseDto: CreateExerciseDto = {
        name: 'Back + Shoulder',
        userId: mockUser.id,
      };

      const result = await exerciseController.create(createExerciseDto);
      expect(result).toEqual(mockExercise);
      expect(exerciseService.create).toHaveBeenCalledWith(createExerciseDto);
    });
  });

  describe('findById', () => {
    it('should return an exercise by ID', async () => {
      const result = await exerciseController.findById(mockExercise.id);

      expect(result).toEqual(mockExercise);
      expect(exerciseService.findById).toHaveBeenCalledWith(mockExercise.id);
    });
  });

  describe('list', () => {
    it('should return an array of exercises', async () => {
      const req = { user: { userId: mockUser.id } } as AuthenticatedRequest;

      const result = await exerciseController.list(req);

      expect(result).toEqual([mockExercise]);
      expect(exerciseService.list).toHaveBeenCalledWith(mockExercise.id);
    });

    it('should throw UnauthorizedException if user is not authenticated', async () => {
      const req = { user: null } as unknown as AuthenticatedRequest;

      await expect(exerciseController.list(req)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('update', () => {
    it('should update an exercise', async () => {
      const updateExerciseDto: UpdateExerciseDto = {
        name: 'Updated Back + Shoulder',
        order: 1,
        userId: mockUser.id,
      };

      const result = await exerciseController.update(
        mockExercise.id,
        updateExerciseDto,
      );

      expect(result).toEqual(mockExercise);
      expect(mockExerciseService.update).toHaveBeenCalledWith(
        mockExercise.id,
        updateExerciseDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an exercise', async () => {
      await expect(
        exerciseController.remove(mockExercise.id),
      ).resolves.toBeUndefined();
      expect(exerciseService.remove).toHaveBeenCalledWith(mockExercise.id);
    });
  });
});
