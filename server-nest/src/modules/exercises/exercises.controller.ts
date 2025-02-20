import { Controller } from '@nestjs/common';
import { ExerciseService } from './exercises.service';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}
}
