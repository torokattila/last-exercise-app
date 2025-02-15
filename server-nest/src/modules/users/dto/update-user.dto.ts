import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'First name is requierd' })
  @IsNotEmpty()
  firstname: string;

  @IsString({ message: 'Last name is required' })
  @IsNotEmpty()
  lastname: string;
}
