import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';
import { UsersService } from 'src/modules/users/users.service';

import { JwtPayload } from '../interfaces';

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

  async validate(payload: JwtPayload): Promise<unknown> {
    try {
      const { email } = payload;
      const user: any = await this.userService.findByEmail(email);

      if (!user) throw new UnauthorizedException('Invalid credentials');

      return user.toJSON();
    } catch (error) {
      this.#logger.error(error.message);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
