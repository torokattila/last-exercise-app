import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockExerciseType } from '../../../../test/mock/mock-exercise-type';
import { CreateExerciseTypeDto } from '../dto/create-exercise-type.dto';
import { UpdateExerciseTypeDto } from '../dto/update-exercise-type.dto';
import { ExerciseType } from '../entities/exercise-type.entity';
import { ExerciseTypeService } from '../exercise-types.service';

const mockExerciseTypeRepository = {
  create: jest.fn().mockResolvedValue(mockExerciseType),
  save: jest.fn().mockResolvedValue(mockExerciseType),
  findOneBy: jest.fn().mockResolvedValue(mockExerciseType),
  preload: jest.fn().mockResolvedValue(mockExerciseType),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ExerciseTypeService', () => {
  let service: ExerciseTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseTypeService,
        {
          provide: getRepositoryToken(ExerciseType),
          useValue: mockExerciseTypeRepository,
        },
      ],
    }).compile();

    service = module.get<ExerciseTypeService>(ExerciseTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an exercise type', async () => {
      const dto: CreateExerciseTypeDto = {
        exerciseId: mockExerciseType.exerciseId,
        name: mockExerciseType.name,
        seriesCardNumber: mockExerciseType.seriesCardNumber,
        cardTextColor: mockExerciseType.cardTextColor,
        numberOfRepetitions: mockExerciseType.numberOfRepetitions,
        order: mockExerciseType.order,
        seriesCardsColor: mockExerciseType.seriesCardsColor,
      };

      const result = await service.create(dto);
      expect(result).toEqual(mockExerciseType);
      expect(mockExerciseTypeRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(dto),
      );
    });
  });

  describe('update', () => {
    it('should update an exercise type', async () => {
      const dto: UpdateExerciseTypeDto = {
        name: 'Updated exercise type',
        exerciseId: mockExerciseType.exerciseId,
      };
      const updatedExerciseType = {
        ...mockExerciseType,
        ...dto,
        updated_at: new Date(),
      };
      mockExerciseTypeRepository.save.mockResolvedValue(updatedExerciseType);

      const result = await service.update(mockExerciseType.id, dto);
      expect(result).toEqual(updatedExerciseType);
    });

    it('should throw NotFoundException if exercise type not found', async () => {
      mockExerciseTypeRepository.preload.mockResolvedValueOnce(null);
      await expect(
        service.update(mockExerciseType.id + 1, { name: 'New Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an exercise type', async () => {
      await service.remove(mockExerciseType.id);
      expect(mockExerciseTypeRepository.remove).toHaveBeenCalledWith(
        mockExerciseType,
      );
    });

    it('should throw NotFoundException if exercise type not found', async () => {
      mockExerciseTypeRepository.findOneBy.mockResolvedValueOnce(null);
      await expect(service.remove(mockExerciseType.id + 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
