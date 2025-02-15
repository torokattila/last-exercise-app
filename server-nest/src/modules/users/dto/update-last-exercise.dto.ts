import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLastExerciseDto {
  @IsNumber()
  @IsNotEmpty()
  exerciseId: number;
}
