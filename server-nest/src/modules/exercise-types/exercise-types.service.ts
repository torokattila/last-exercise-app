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

  async create(
    createDto: CreateExerciseTypeDto & { created_at?: Date; updated_at?: Date },
  ): Promise<ExerciseType> {
    const newExerciseType = this.exerciseTypeRepository.create(createDto);
    return await this.exerciseTypeRepository.save(newExerciseType);
  }

  async update(
    id: number,
    updateDto: UpdateExerciseTypeDto,
  ): Promise<ExerciseType> {
    const exerciseType = await this.exerciseTypeRepository.preload({
      id,
      ...updateDto,
    });

    if (!exerciseType) {
      throw new NotFoundException(`ExerciseType with ID: ${id} not found`);
    }

    delete updateDto.exercise;

    return await this.exerciseTypeRepository.save({
      ...exerciseType,
      updated_at: new Date(),
    });
  }

  async remove(id: number): Promise<void> {
    const exerciseType = await this.exerciseTypeRepository.findOneBy({ id });

    if (!exerciseType) {
      throw new NotFoundException(`ExerciseType with ID: ${id} not found`);
    }

    await this.exerciseTypeRepository.remove(exerciseType);
  }
}
