import { Controller } from '@nestjs/common';
import { ExerciseTypeService } from './exercise-types.service';

@Controller('exercise-types')
export class ExerciseTypeController {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {}
}
