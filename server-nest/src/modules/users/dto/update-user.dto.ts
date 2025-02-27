import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'First name is requierd' })
  @IsNotEmpty()
  firstName: string;

  @IsString({ message: 'Last name is required' })
  @IsNotEmpty()
  lastName: string;
}
