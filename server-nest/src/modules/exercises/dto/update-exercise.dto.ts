import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdateExerciseTypeDto } from '../../exercise-types/dto/update-exercise-type.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @ValidateNested({ each: true })
  @Type(() => UpdateExerciseTypeDto)
  exerciseTypes?: Partial<UpdateExerciseTypeDto>[];
}
