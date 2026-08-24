import { Inject, Injectable } from '@nestjs/common';
import { TimeOff } from '@/time-off/domain/entities/time-off.entity';
import { NewTimeOff } from '@/time-off/domain/entities/new-time-off';
import type { TimeOffRepository } from '@/time-off/domain/repositories/time-off.repository';
import { TIME_OFF_REPOSITORY } from '@/time-off/domain/repositories/time-off.repository';
import { CreateTimeOffDto } from '@/time-off/application/dtos/create-time-off.dto';
import type { UserRepository } from '@/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/user/domain/repositories/user.repository';
import {
  EntityNotFoundException,
  ConflictDomainException,
} from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class CreateTimeOffUseCase {
  constructor(
    @Inject(TIME_OFF_REPOSITORY)
    private readonly timeOffRepository: TimeOffRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository, // Inyectamos el repositorio de usuarios
  ) {}

  async execute(dto: CreateTimeOffDto): Promise<TimeOff> {
    // 1. Usamos findById para validar que el empleado exista en la base de datos
    const staffMember = await this.userRepository.findById(dto.staffId);
    if (!staffMember) {
      // Pasamos los parámetros correctos que espera tu excepción personalizada
      throw new EntityNotFoundException('User', dto.staffId);
    }

    // 2. Validar que la fecha de inicio no sea mayor o igual a la fecha de fin
    if (dto.startDatetime >= dto.endDatetime) {
      throw new ConflictDomainException('The start datetime must be earlier than the end datetime');
    }

    // 3. Crear la entidad de dominio para el repositorio de time_off
    const newTimeOff = new NewTimeOff(dto.staffId, dto.reason, dto.startDatetime, dto.endDatetime);

    // 4. Guardar en la base de datos
    return this.timeOffRepository.create(newTimeOff);
  }
}
