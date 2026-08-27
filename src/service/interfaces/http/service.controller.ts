import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateServiceUseCase } from '@/service/application/use-cases/create-service.use-case';
import { GetServiceUseCase } from '@/service/application/use-cases/get-service.use-case';
import { ListServicesUseCase } from '@/service/application/use-cases/list-services.use-case';
import { UpdateServiceUseCase } from '@/service/application/use-cases/update-service.use-case';
import { DeleteServiceUseCase } from '@/service/application/use-cases/delete-service.use-case';
import { CreateServiceDto } from '@/service/application/dtos/create-service.dto';
import { UpdateServiceDto } from '@/service/application/dtos/update-service.dto';
import { ParseIdPipe } from '@/service/interfaces/http/pipes/parse-id.pipe';

/**
 * Service controller.
 *
 * The `ValidIdGuard` is applied at the controller level, meaning it runs
 * BEFORE every handler in this controller. It checks if the `:id` route
 * parameter (when present) is a valid positive integer.
 *
 * The `ParseIdPipe` is applied per-method on the `id` parameter and
 * transforms the string `:id` from the URL into a validated `number`.
 */
@Controller('services')
export class ServiceController {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly getServiceUseCase: GetServiceUseCase,
    private readonly listServicesUseCase: ListServicesUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
    private readonly deleteServiceUseCase: DeleteServiceUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.createServiceUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.getServiceUseCase.execute(id);
  }

  @Get()
  findAll() {
    return this.listServicesUseCase.execute();
  }

  @Put(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: UpdateServiceDto) {
    return this.updateServiceUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.deleteServiceUseCase.execute(id);
  }
}
