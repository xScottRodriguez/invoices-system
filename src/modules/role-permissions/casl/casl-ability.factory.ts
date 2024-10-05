import {
  Ability,
  AbilityBuilder,
  AbilityTuple,
  AnyAbility,
  MongoQuery,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Permission, User } from '@prisma/client';

import { PermissionsService } from '@/modules/permissions/permissions.service';

import { Action } from './action.enum';

export type AppAbility = PureAbility<[Action, string]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private permissionService: PermissionsService) {}

  async createForUser(user: User): Promise<AnyAbility> {
    const data: Permission[] =
      await this.permissionService.getPermissionsForRole(user.roleId);
    return this.defineAbility(data);
  }

  private defineAbility(
    permissions: Permission[],
  ): Ability<AbilityTuple, MongoQuery> {
    const { can, build } = new AbilityBuilder(Ability);

    permissions.forEach(permission => {
      const { name, resource } = permission;
      can(name as Action, resource);
    });

    return build();
  }
}
