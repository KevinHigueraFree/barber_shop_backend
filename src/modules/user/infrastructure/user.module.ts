import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/modules/user/interfaces/http/user.controller';
import { ValidIdGuard } from '@/shared/interfaces/http/guards/valid-id.guard';
import { CreateUserUseCase } from '@/modules/user/application/use-cases/create-user.use-case';
import { GetUserUseCase } from '@/modules/user/application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '@/modules/user/application/use-cases/list-users.use-case';
import { UpdateUserUseCase } from '@/modules/user/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@/modules/user/application/use-cases/delete-user.use-case';
import { USER_REPOSITORY } from '@/modules/user/domain/repositories/user.repository';
import { TypeOrmUserRepository } from '@/modules/user/infrastructure/persistence/typeorm-user.repository';
import { TypeOrmUserEntity } from '@/modules/user/infrastructure/persistence/typeorm-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    ValidIdGuard,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: ['USER_REPOSITORY'],
})
export class UserModule {}
