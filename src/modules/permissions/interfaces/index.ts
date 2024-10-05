import { Permission } from '@prisma/client';

interface IPermissionForUser {
  permission: Permission[];
}

export { IPermissionForUser };
