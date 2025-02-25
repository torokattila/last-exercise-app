import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../types/authenticated-request';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { ExerciseService } from './exercises.service';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Exercise> {
    return this.exerciseService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Req() req: AuthenticatedRequest): Promise<Exercise[]> {
    if (!req.user?.id) {
      throw new UnauthorizedException('User is not authenticated');
    }

    return this.exerciseService.list(req.user.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExerciseDto,
  ): Promise<Exercise> {
    return this.exerciseService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.exerciseService.remove(id);
  }
}
