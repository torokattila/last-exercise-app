import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import EntityBase from './EntityBase';
import Exercise from './Exercise';

@Entity({ name: 'users' })
export default class User extends EntityBase {
  @Column({ name: 'google_id', nullable: true })
  googleId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}
