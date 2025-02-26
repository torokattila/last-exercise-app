import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseType } from '../exercise-types/entities/exercise-type.entity';
import { ExerciseTypeModule } from '../exercise-types/exercise-types.module';
import { User } from '../users/entities/user.entity';
import { Exercise } from './entities/exercise.entity';
import { ExerciseController } from './exercises.controller';
import { ExerciseService } from './exercises.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseType, User]),
    ExerciseTypeModule,
    UsersModule,
  ],
  providers: [ExerciseService],
  controllers: [ExerciseController],
  exports: [ExerciseService],
})
export class ExerciseModule {}
