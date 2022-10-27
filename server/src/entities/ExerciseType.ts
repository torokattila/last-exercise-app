import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import EntityBase from './EntityBase';
import Exercise from './Exercise';

@Entity({ name: 'exercise-types' })
export default class ExerciseType extends EntityBase {
  @Column()
  name: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.exerciseTypes, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ name: 'exercise_id' })
  exerciseId: string;

  @Column({ default: 0 })
  seriesCardNumber: number;

  @Column()
  cardsColor: string;
}
