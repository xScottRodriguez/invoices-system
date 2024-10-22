import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';
import { UsersService } from 'src/modules/users/users.service';

import { UserEntity } from '../entity/user.entity';
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
      this.#logger.debug('Validating...');
      const { email } = payload;
      const user: User = await this.userService.findByEmail(email);
      if (!user) throw new UnauthorizedException('Invalid credentials');

      return new UserEntity(user);
    } catch (error) {
      this.#logger.error(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
