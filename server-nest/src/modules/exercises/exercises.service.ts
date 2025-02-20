import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { ExerciseTypeService } from '../exercise-types/exercise-types.service';
import { User } from '../users/entities/user.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseType } from '../exercise-types/entities/exercise-type.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    private readonly exerciseTypeService: ExerciseTypeService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateExerciseDto): Promise<Exercise> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: dto.userId },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${dto.userId} not found`);
      }

      const exercise = this.exerciseRepository.create({
        ...dto,
        user,
      });

      const savedExercise = await this.exerciseRepository.save(exercise);

      if (dto.exerciseTypes?.length) {
        await Promise.all(
          dto.exerciseTypes.map(async (exerciseType) => {
            await this.exerciseTypeService.create({
              ...exerciseType,
              exerciseId: savedExercise.id,
            });
          }),
        );
      }

      return savedExercise;
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Error creating exercise: ${error}`,
      );
    }
  }

  async findById(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: ['user', 'exerciseTypes'],
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    return exercise;
  }

  async list(userId: number): Promise<Exercise[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.exerciseRepository.find({
      where: { user: { id: userId } },
      relations: ['exerciseTypes'],
      order: { order: 'ASC' },
    });
  }

  async update(id: number, dto: UpdateExerciseDto): Promise<Exercise> {
    const exercise = await this.findById(id);

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    Object.assign(exercise, dto);
    exercise.updated_at = new Date();

    if (dto?.exerciseTypes?.length) {
      await Promise.all(
        dto.exerciseTypes.map(async (exerciseType: ExerciseType) => {
          exerciseType.id
            ? await this.exerciseTypeService.update(exerciseType)
            : await this.exerciseTypeService.create(exerciseType);
        }),
      );
    }

    return this.exerciseRepository.save(exercise);
  }

  async remove(id: number): Promise<void> {
    const exercise = await this.findById(id);

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    await this.exerciseRepository.remove(exercise);
  }
}
