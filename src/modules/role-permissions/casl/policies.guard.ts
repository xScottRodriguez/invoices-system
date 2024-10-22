import { AnyAbility } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Action } from '../../../enums/action.enum';
import { CaslAbilityFactory } from './casl-ability.factory';

/**\
 * PoliciesGuard - Guard to check if user has permission to perform action on resource
 * @class PoliciesGuard
 * @implements {CanActivate}
 * @exports PoliciesGuard
 * @injectable - Injectable
 * @param {Reflector} reflector - Reflector
 * @param {CaslAbilityFactory} caslAbilityFactory - CaslAbilityFactory
 * @method {canActivate} - Check if user has permission to perform action on resource
 * @returns {boolean} - Returns true if user has permission to perform action on resource
 */
@Injectable()
export class PoliciesGuard implements CanActivate {
  #logger = new Logger(PoliciesGuard.name);
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      this.#logger.debug('Checking policies...');
      const req = context.switchToHttp().getRequest();
      const user = req.user;

      const ability: AnyAbility =
        await this.caslAbilityFactory.createForUser(user);

      const action = this.reflector.get<Action>('action', context.getHandler());
      const resource = this.reflector.get<string>(
        'resource',
        context.getHandler(),
      );

      if (!action || !resource) {
        return false;
      }

      const hasAllPermission = ability.can(Action.all, resource);

      this.#logger.debug({
        action,
        resource,
        hasAllPermission,
      });
      if (hasAllPermission) {
        return true;
      }

      return ability.can(action, resource);
    } catch (error) {
      this.#logger.error({
        message: error.message,
        stack: error.stack,
      });
      return false;
    }
  }
}
