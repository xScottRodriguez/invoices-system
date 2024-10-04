import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { CreateUserDto } from 'src/modules/auth/dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  id: number;
}
