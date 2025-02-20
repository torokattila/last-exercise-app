import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExerciseTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  exerciseId: number;

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
