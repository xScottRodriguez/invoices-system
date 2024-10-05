import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({
    example: 'johnDoe@gmail.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, one letter and one number',
  })
  readonly password: string;

  @ApiProperty({
    example: 1,
    description: 'The role id of the user',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly roleId: number;
}
