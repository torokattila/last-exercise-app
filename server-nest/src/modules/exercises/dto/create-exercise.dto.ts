import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateExerciseTypeDto } from '../../exercise-types/dto/create-exercise-type.dto';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseTypeDto)
  exerciseTypes?: CreateExerciseTypeDto[];

  @IsOptional()
  @IsString()
  cardColor?: string;

  @IsOptional()
  @IsString()
  textColor?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
