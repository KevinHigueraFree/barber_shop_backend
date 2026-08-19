import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/list-users.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { ParseIdPipe } from './pipes/parse-id.pipe';

/**
 * User controller.
 *
 * The `ValidIdGuard` is applied at the controller level, meaning it runs
 * BEFORE every handler in this controller. It checks if the `:id` route
 * parameter (when present) is a valid positive integer.
 *
 * The `ParseIdPipe` is applied per-method on the `id` parameter and
 * transforms the string `:id` from the URL into a validated `number`.
 */
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getUserUseCase.execute(id);
  }

  @Get()
  findAll() {
    return this.listUsersUseCase.execute();
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteUserUseCase.execute(id);
  }
}
