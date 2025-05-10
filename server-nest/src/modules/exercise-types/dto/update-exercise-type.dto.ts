import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { CreateExerciseTypeDto } from './create-exercise-type.dto';

export class UpdateExerciseTypeDto extends PartialType(CreateExerciseTypeDto) {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsDateString()
  created_at?: string;

  @IsOptional()
  @IsDateString()
  updated_at?: string;
}
