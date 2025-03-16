import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Auth } from '../../common/decorators/auth.decorator';
import { ExerciseTypeService } from './exercise-types.service';

@Controller('exercise-types')
export class ExerciseTypeController {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {}

  @Delete(':id')
  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.exerciseTypeService.remove(id);
  }
}
