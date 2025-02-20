import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseType } from '../exercise-types/entities/exercise-type.entity';
import { Exercise } from './entities/exercise.entity';
import { ExerciseController } from './exercises.controller';
import { ExerciseService } from './exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseType])],
  providers: [ExerciseService],
  controllers: [ExerciseController],
  exports: [ExerciseService],
})
export class ExerciseModule {}
