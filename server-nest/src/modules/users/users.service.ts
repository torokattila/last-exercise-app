import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { In, Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { Exercise } from '../exercises/entities/exercise.entity';
import { UpdateLastExerciseDto } from './dto/update-last-exercise.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(dto: Partial<RegisterDto>): Promise<User> {
    const createdUser = await this.userRepository.save(dto);

    return createdUser;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'lastExercise',
        'exercises',
        'exercises.exerciseTypes',
        'lastExercise',
        'lastExercise.exerciseTypes',
      ],
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.exerciseHistory && user.exerciseHistory.length > 0) {
      const exerciseIds = user.exerciseHistory.map(
        (history) => history.exerciseId,
      );
      const exercises = await this.exerciseRepository.findBy({
        id: In(exerciseIds),
      });

      user.exerciseHistory = user.exerciseHistory.map((history) => {
        const exercise = exercises.find((ex) => ex.id === history.exerciseId);
        return { ...history, exercise };
      });
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, {
      firstname: updateUserDto.firstname,
      lastname: updateUserDto.lastname,
    });
    user.updated_at = new Date();

    return this.userRepository.save(user);
  }

  async updatePassword(id: number, dto: UpdatePasswordDto): Promise<void> {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await bcrypt.compare(
      dto.currentPassword,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Invalid current password');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Passwords must match');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    user.updated_at = new Date();

    await this.userRepository.save(user);
  }

  async updateLastExercise(
    id: number,
    dto: UpdateLastExerciseDto,
  ): Promise<User> {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    user.lastExerciseId = dto.exerciseId;
    user.updated_at = new Date();

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    await this.userRepository.update(id, {
      lastExerciseId: dto.exerciseId,
      updated_at: new Date(),
      exerciseHistory: [
        ...(user.exerciseHistory ?? []),
        { date: today, exerciseId: Number(dto.exerciseId) },
      ],
    });
    const updatedUser = await this.findById(id);

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.remove(user);
  }
}
