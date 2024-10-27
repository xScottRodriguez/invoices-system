import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class PaginationQueryDto<Filter> {
  @ApiPropertyOptional({
    minimum: 1,
    default: 25,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  readonly limit: number = 25;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  readonly page?: number = 1;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'asc',
  })
  @IsOptional()
  readonly orderBy?: 'asc' | 'desc' = 'asc';

  @ApiPropertyOptional()
  @IsOptional({ each: true })
  @IsObject({ each: true })
  filters?: Filter;
}
