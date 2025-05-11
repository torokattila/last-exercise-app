/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class UserResponseDto extends PickType(User, [
  'id',
  'email',
  'created_at',
  'updated_at',
  'firstname',
  'lastname',
  'lastExercise',
  'lastExerciseId',
  'exercises',
  'exerciseHistory',
]) {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.lastExercise = user.lastExercise;
    this.lastExerciseId = user.lastExerciseId;
    this.exercises = user.exercises;
    this.exerciseHistory = user.exerciseHistory;
  }
}
