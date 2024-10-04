import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    RolesModule,
    RolePermissionsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
