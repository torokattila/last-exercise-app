import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @OneToOne(() => Exercise, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'last_exercise_id' })
  lastExercise: Exercise;

  @Column({ name: 'last_exercise_id', nullable: true })
  lastExerciseId: number;

  @Column({ type: 'jsonb', nullable: true, default: () => "'[]'" })
  exerciseHistory: { date: string; exerciseId: number }[];
}
