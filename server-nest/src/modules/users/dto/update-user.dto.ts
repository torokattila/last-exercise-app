import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'Firstname is required' })
  @IsNotEmpty()
  firstname: string;

  @IsString({ message: 'Lastname is required' })
  @IsNotEmpty()
  lastname: string;
}
