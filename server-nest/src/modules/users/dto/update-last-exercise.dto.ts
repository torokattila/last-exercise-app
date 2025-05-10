import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLastExerciseDto {
  @IsNumber()
  @IsNotEmpty()
  exerciseId: number;

  @IsString()
  @IsOptional()
  duration?: string | undefined;
}
