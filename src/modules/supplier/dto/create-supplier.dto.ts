import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  contactEmail: string;
  @IsPhoneNumber('SV')
  phone: string;
  @IsString()
  @MinLength(10, { message: 'Address is too short' })
  address: string;
}
