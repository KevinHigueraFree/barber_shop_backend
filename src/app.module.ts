import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '@/config/database.config';
import { UserModule } from '@/modules/user/infrastructure/user.module';
import { ServiceModule } from '@/modules/service/infrastructure/service.module';
import { TimeOffModule } from '@/modules/time-off/infrastructure/time-off.module';
import { StaffScheduleModule } from '@/modules/staff-schedule/infrastructure/staff-schedule.module';
import { StaffServiceModule } from '@/modules/staff-service/infrastructure/staff-service.module';
import { SchedulingSettingModule } from '@/modules/scheduling-setting/infrastructure/scheduling-setting.module';
import { TimeSlotModule } from '@/modules/time-slot/infrastructure/time-slot.module';
import { AppointmentStatusModule } from '@/modules/appointment-status/infrastructure/appointment-status.module';
import { ModuleModule } from '@/modules/module/infrastructure/module.module';
import { ActionModule } from '@/modules/action/infrastructure/action.module';
import { PermissionModule } from '@/modules/permission/infrastructure/permission.module';
import { RoleModule } from '@/modules/role/infrastructure/role.module';
import { RolePermissionModule } from '@/modules/role-permission/infrastructure/role-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('database')!,
    }),
    UserModule,
    ServiceModule,
    TimeOffModule,
    StaffScheduleModule,
    StaffServiceModule,
    SchedulingSettingModule,
    TimeSlotModule,
    AppointmentStatusModule,
    ModuleModule,
    ActionModule,
    PermissionModule,
    RoleModule,
    RolePermissionModule,
  ],
})
export class AppModule {}
