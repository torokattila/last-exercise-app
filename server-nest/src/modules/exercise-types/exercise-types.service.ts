import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseType } from './entities/exercise-type.entity';
import { CreateExerciseTypeDto } from './dto/create-exercise-type.dto';
import { UpdateExerciseTypeDto } from './dto/update-exercise-type.dto';

@Injectable()
export class ExerciseTypeService {
  constructor(
    @InjectRepository(ExerciseType)
    private readonly exerciseTypeRepository: Repository<ExerciseType>,
  ) {}

  async create(createDto: CreateExerciseTypeDto): Promise<ExerciseType> {
    const newExerciseType = this.exerciseTypeRepository.create(createDto);
    return await this.exerciseTypeRepository.save(newExerciseType);
  }

  async update(
    id: number,
    updateDto: UpdateExerciseTypeDto,
  ): Promise<ExerciseType> {
    const exercistType = await this.exerciseTypeRepository.preload({
      id,
      ...updateDto,
    });

    if (!exercistType) {
      throw new NotFoundException(`ExerciseType with ID: ${id} not found`);
    }

    return await this.exerciseTypeRepository.save(exercistType);
  }

  async remove(id: number): Promise<void> {
    const result = await this.exerciseTypeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`ExerciseType with ID: ${id} not found`);
    }
  }
}
