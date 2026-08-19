import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '@/user/interfaces/http/user.controller';
import { ValidIdGuard } from '@/user/interfaces/http/guards/valid-id.guard';
import { CreateUserUseCase } from '@/user/application/use-cases/create-user.use-case';
import { GetUserUseCase } from '@/user/application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '@/user/application/use-cases/list-users.use-case';
import { UpdateUserUseCase } from '@/user/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@/user/application/use-cases/delete-user.use-case';
import { USER_REPOSITORY } from '@/user/domain/repositories/user.repository';
import { TypeOrmUserRepository } from '@/user/infrastructure/persistence/typeorm-user.repository';
import { TypeOrmUserEntity } from '@/user/infrastructure/persistence/typeorm-user.entity';

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
})
export class UserModule {}
