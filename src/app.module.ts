import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { envs } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: { expiresIn: envs.jwtExpiration },
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    RolesModule,
    RolePermissionsModule,
    PermissionsModule,
  ],
  controllers: [],
  providers: [],
  exports: [PrismaModule],
})
export class AppModule {}
