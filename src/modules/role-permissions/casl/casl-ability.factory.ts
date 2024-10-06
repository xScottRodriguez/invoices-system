import {
  Ability,
  AbilityBuilder,
  AbilityTuple,
  AnyAbility,
  MongoQuery,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { IPermission } from '@/interfaces/*';
import { PermissionsService } from '@/modules/permissions/permissions.service';

import { Action } from '../../../enums/action.enum';

export type AppAbility = PureAbility<[Action, string]>;

@Injectable()
export class CaslAbilityFactory {
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
