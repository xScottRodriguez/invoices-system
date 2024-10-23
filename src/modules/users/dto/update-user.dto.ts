import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/auth/dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
