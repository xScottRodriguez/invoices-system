import { UserResponseDto } from '../dto';

export * from './jwt-payload.interface';
export interface ISignIn {
  user: UserResponseDto;
  accessToken: string;
}
