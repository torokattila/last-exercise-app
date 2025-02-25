import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../entities/exercise.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { mockExercise } from '../../../../test/mock/mock-exercise';

const mockExerciseRepository = {
  save: jest.fn().mockResolvedValue(mockExercise),
  findOne: jest.fn().mockResolvedValue(mockExercise),
  find: jest.fn().mockResolvedValue([mockExercise]),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ExerciseService', () => {});
