import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'User Name',
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    description: 'User Email',
    example: '  [email protected]',
  })
  email: string;

  @Exclude()
  password: string;
  @ApiProperty({
    description: 'Date of creation',
    example: '2021-09-01T00:00:00.000Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'Date of the last update',
    example: '2021-09-01T00:00:00.000Z',
  })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
