import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ExerciseModule } from './modules/exercises/exercises.module';
import { UsersModule } from './modules/users/users.module';
import { ExerciseTypeModule } from './modules/exercise-types/exercise-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ExerciseModule,
    ExerciseTypeModule,
  ],
})
export class AppModule {}
