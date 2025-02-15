import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ExerciseType } from '../../exercise-types/exercise-type.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'exercises' })
export class Exercise extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.exercises, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ nullable: true })
  duration: string;

  @OneToMany(() => ExerciseType, (exerciseType) => exerciseType.exercise)
  exerciseTypes: ExerciseType[];

  @Column({ name: 'card_color', default: '#005A92' })
  cardColor: string;

  @Column({ name: 'text_color', default: '#fff' })
  textColor: string;

  @Column({ name: 'order', default: 1 })
  order: number;
}
