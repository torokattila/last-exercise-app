import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToOne(() => Exercise, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'last_exercise_id' })
  lastExercise: Exercise;

  @Column({ name: 'last_exercise_id', nullable: true })
  lastExerciseId: number;
}
