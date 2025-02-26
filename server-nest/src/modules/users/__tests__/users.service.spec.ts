/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../auth/dto/register.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { UpdateLastExerciseDto } from '../dto/update-last-exercise.dto';
import { mockUser } from '../../../../test/mock/mock-user';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    save: jest.fn().mockResolvedValue(mockUser),
    findOne: jest.fn().mockResolvedValue(mockUser),
    findOneBy: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: Partial<RegisterDto> = {
        email: 'test@example.com',
        password: 'password',
        passwordConfirm: 'password',
      };
      const result = await service.create(dto);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const result = await service.findById(1);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['lastExercise'],
      });
    });

    it('should throw NotFoundException is user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const result = await service.findOneByEmail(mockUser.email);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        email: mockUser.email,
      });
    });

    it('should throw error if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValueOnce(null);

      await expect(service.findOneByEmail('example@test.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const dto: UpdateUserDto = {
        firstname: 'Updated firstname',
        email: mockUser.email,
        lastname: mockUser.lastname,
      };
      const updatedUser = { ...mockUser, ...dto, updated_at: new Date() };

      mockUserRepository.save.mockResolvedValue(updatedUser);
      const result = await service.update(1, dto);

      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(updatedUser);
    });

    it('should throw error if the user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.update(2, {
          firstname: 'Updated firstname',
          email: mockUser.email,
          lastname: mockUser.lastname,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePassword', () => {
    it('should update the password if current password is valid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);
      jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValueOnce('newHashedPassword' as never);

      const dto: UpdatePasswordDto = {
        currentPassword: mockUser.password,
        newPassword: 'newPassword',
        confirmPassword: 'newPassword',
      };

      await service.updatePassword(1, dto);

      expect(mockUserRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        password: 'newHashedPassword',
        updated_at: expect.any(Date),
      });
    });

    it('should throw BadRequestException if current password is incorrect', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

      const dto: UpdatePasswordDto = {
        currentPassword: 'wrondPassword',
        newPassword: 'newPassword',
        confirmPassword: 'newPassword',
      };

      await expect(service.updatePassword(1, dto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if passwords do not match', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const dto: UpdatePasswordDto = {
        currentPassword: 'password',
        newPassword: 'newPassword',
        confirmPassword: 'wrongConfirmPassword',
      };

      await expect(service.updatePassword(1, dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateLastExercise', () => {
    it('should update last exercise for a user', async () => {
      const dto: UpdateLastExerciseDto = { exerciseId: 2 };
      const updatedUser = {
        ...mockUser,
        lastExerciseId: 2,
        updated_at: new Date(),
      };

      mockUserRepository.save.mockResolvedValue(updatedUser);
      const result = await service.updateLastExercise(1, dto);

      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockUser.id,
          lastExerciseId: dto.exerciseId,
        }),
      );
    });

    it('should throw error if the user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.updateLastExercise(mockUser.id + 1, {
          exerciseId: 2,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      await service.remove(mockUser.id);
      expect(mockUserRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
