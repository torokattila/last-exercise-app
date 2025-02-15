import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { Match } from '../../../validators/match.validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(Match, ['newPassword'], { message: 'Passwords do not match' })
  confirmPassword: string;
}
