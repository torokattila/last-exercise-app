/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { mockExerciseType } from '../../../../test/mock/mock-exercise-type';
import { ExerciseTypeController } from '../exercise-types.controller';
import { ExerciseTypeService } from '../exercise-types.service';

const mockExerciseTypeService = {
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ExerciseTypesController', () => {
  let exerciseTypeController: ExerciseTypeController;
  let exerciseTypeService: ExerciseTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseTypeController],
      providers: [
        {
          provide: ExerciseTypeService,
          useValue: mockExerciseTypeService,
        },
      ],
    }).compile();

    exerciseTypeController = module.get<ExerciseTypeController>(
      ExerciseTypeController,
    );
    exerciseTypeService = module.get<ExerciseTypeService>(ExerciseTypeService);
  });

  it('should be defined', () => {
    expect(exerciseTypeController).toBeDefined();
  });

  describe('remove', () => {
    it('should remove an exercise type', async () => {
      await expect(
        exerciseTypeController.remove(mockExerciseType.id),
      ).resolves.toBeUndefined();
      expect(exerciseTypeService.remove).toHaveBeenCalledWith(
        mockExerciseType.id,
      );
    });
  });
});
