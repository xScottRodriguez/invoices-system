import { PrismaClient, Resource, Role } from '@prisma/client';

import { Action, Resource as ResourcesEnum } from '../src/enums';

interface IAction {
  action: Action;
}
class MainSeeder {
  #prisma: PrismaClient = new PrismaClient();
  async defaultRoles(): Promise<{ adminRole: Role; userRole: Role }> {
    const adminRole = await this.#prisma.role.upsert({
      where: { name: 'admin', id: 1 }, // Solo usas el nombre
      update: {},
      create: {
        name: 'admin',
      },
    });

    const userRole = await this.#prisma.role.upsert({
      where: { name: 'user', id: 2 }, // Solo usas el nombre
      update: {},
      create: {
        name: 'user',
      },
    });

    return { adminRole, userRole };
  }
  async createResources(): Promise<void> {
    const data = Object.keys(ResourcesEnum).map((resource: ResourcesEnum) => ({
      name: resource,
    }));
    await this.#prisma.resource.createMany({
      data,
    });
  }

  async createPermissions(): Promise<void> {
    const resources: Resource[] = await this.#prisma.resource.findMany();
    const data: IAction[] = Object.values(Action).map((action: Action) => {
      return {
        action,
      };
    });

    const response = await Promise.allSettled(
      resources.map(async resource => {
        await this.#prisma.permission.createMany({
          data: data.map(permission => ({
            ...permission,
            resourceId: resource.id,
            description: `${permission.action} ${resource.name}`,
          })),
        });
      }),
    );
    response.forEach(res => {
      if (res.status === 'rejected') {
        console.log(res.reason);
      }

      if (res.status === 'fulfilled') {
        console.log('Permissions created');
      }
    });
  }

  build = async (): Promise<void> => {
    await this.createResources();
    await this.createPermissions();
    await this.defaultRoles();
  };
}

const mainSeeder = new MainSeeder();
mainSeeder.build();
