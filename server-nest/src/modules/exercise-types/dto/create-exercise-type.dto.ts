import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exercise } from '../../exercises/entities/exercise.entity';

export class CreateExerciseTypeDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string | undefined;

  @IsOptional()
  @IsNumber()
  exerciseId?: number;

  @IsOptional()
  exercise?: Exercise;

  @IsOptional()
  @IsNumber()
  seriesCardNumber?: number;

  @IsOptional()
  @IsString()
  seriesCardsColor?: string;

  @IsOptional()
  @IsString()
  cardTextColor?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsNumber()
  numberOfRepetitions?: number;
}
