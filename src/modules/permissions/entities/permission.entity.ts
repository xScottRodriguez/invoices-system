import { ApiProperty } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({
    example: 'create',
    description: 'Permission action',
  })
  action: string;

  @ApiProperty({
    example: 'Create any resource',
    description: 'Permission description',
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Resource ID',
  })
  resourceId: number;

  @ApiProperty({
    example: 1,
    description: 'Permission ID',
  })
  id: number;
}
