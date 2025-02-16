import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Match } from '../../../validators/match.validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'passwordConfirm is required' })
  @Validate(Match, ['password'], { message: 'Passwords do not match' })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty({ message: 'firstName is required' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'lastName is required' })
  lastName: string;
}
