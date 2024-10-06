import {
  Ability,
  AbilityBuilder,
  AbilityTuple,
  AnyAbility,
  MongoQuery,
  PureAbility,
} from '@casl/ability';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';

import { IPermission } from '@/interfaces/*';
import { PermissionsService } from '@/modules/permissions/permissions.service';

import { Action } from '../../../enums/action.enum';

export type AppAbility = PureAbility<[Action, string]>;

/**
 * CaslAbilityFactory - Factory to create ability for user
 * @class CaslAbilityFactory
 * @exports CaslAbilityFactory
 * @injectable - Injectable
 * @param {PermissionsService} permissionService - PermissionsService
 * @method {createForUser} - Create ability for user
 * @returns {Promise<AnyAbility>} - Returns ability for user
 */
@Injectable()
export class CaslAbilityFactory {
  #logger = new Logger(CaslAbilityFactory.name);
  constructor(private permissionService: PermissionsService) {}

  async createForUser(user: User): Promise<AnyAbility> {
    const data: IPermission[] =
      await this.permissionService.getPermissionsForRole(user.roleId);

    return this.defineAbility(data);
  }

  private defineAbility(
    permissions: IPermission[],
  ): Ability<AbilityTuple, MongoQuery> {
    const { can, build } = new AbilityBuilder(Ability);

    permissions.forEach(permission => {
      const { action, resource } = permission;

      can(action, resource.name);
    });

    return build();
  }
}
