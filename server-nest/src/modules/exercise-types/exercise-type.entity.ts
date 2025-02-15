import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Exercise } from '../exercises/entities/exercise.entity';

@Entity({ name: 'exercise-types' })
export class ExerciseType extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.exerciseTypes, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ name: 'exercise_id' })
  exerciseId: number;

  @Column({ name: 'series_card_number', nullable: true })
  seriesCardNumber: number;

  @Column({ name: 'series_card_color', default: '#005A92' })
  seriesCardsColor: string;

  @Column({ name: 'card_text_color', default: '#fff' })
  cardTextColor: string;

  @Column({ name: 'order', default: 1 })
  order: number;

  @Column({ name: 'number_of_repetitions', nullable: true })
  numberOfRepetitions: number;
}
