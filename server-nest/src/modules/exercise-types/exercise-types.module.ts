import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseType } from './entities/exercise-type.entity';
import { ExerciseTypeService } from './exercise-types.service';
import { ExerciseTypeController } from './exercise-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseType])],
  providers: [ExerciseTypeService],
  controllers: [ExerciseTypeController],
  exports: [ExerciseTypeService],
})
export class ExerciseTypeModule {}
