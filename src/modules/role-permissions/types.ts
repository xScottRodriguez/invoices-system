interface IRolePermissionForUser {
  role: {
    rolePermissions: IRolePermission[];
  };
}

interface IRolePermission {
  permission: IPermission;
}
interface IPermission {
  name: string;
  id: number;
}

export { IRolePermissionForUser, IRolePermission, IPermission };
