import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtPayload } from '../interfaces';
import { envs } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  #logger = new Logger(JwtStrategy.name);
  constructor(private userService: UsersService) {
    super({
      secretOrKey: envs.jwtSecret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    try {
      const { email } = payload;
      const user: UserEntity = await this.userService.findByEmail(email);

      if (!user) throw new UnauthorizedException('Invalid credentials');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user.toJSON();
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
