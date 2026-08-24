import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '@/config/database.config';
import { UserModule } from '@/user/infrastructure/user.module';
import { ServiceModule } from '@/service/infrastructure/service.module';
import { TimeOffModule } from '@/time-off/infrastructure/time-off.module';

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
  ],
})
export class AppModule {}
