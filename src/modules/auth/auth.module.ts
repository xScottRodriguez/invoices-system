import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ResponseHandler } from 'src/common/response.handler';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { EncoderService } from './encoder.service';
import { JwtStrategy } from './strategy';
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: envs.jwtExpiration },
    }),
  ],
  providers: [AuthService, ResponseHandler, EncoderService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
