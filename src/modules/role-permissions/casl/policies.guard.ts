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

/**
 * El Guard intercepta la solicitud, obtiene el rol del usuario,
 * verifica sus permisos en la base de datos y decide si la acción está permitida.
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
      const req = context.switchToHttp().getRequest();
      const user = req.user; // Obtenemos el usuario de la request

      // Crea la habilidad del usuario
      const ability: AnyAbility =
        await this.caslAbilityFactory.createForUser(user);

      // Obtener la acción y el recurso del endpoint actual
      const action = this.reflector.get<Action>('action', context.getHandler());
      const resource = this.reflector.get<string>(
        'resource',
        context.getHandler(),
      );

      if (!action || !resource) {
        return false;
      }

      const hasAllPermission = ability.can(Action.all, resource);

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
