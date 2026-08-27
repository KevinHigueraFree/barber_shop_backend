import { Inject, Injectable } from '@nestjs/common';
import { TimeOff } from '@/time-off/domain/entities/time-off.entity';
import type { TimeOffRepository } from '@/time-off/domain/repositories/time-off.repository';
import { TIME_OFF_REPOSITORY } from '@/time-off/domain/repositories/time-off.repository';
import type { UserRepository } from '@/user/domain/repositories/user.repository';
import { USER_REPOSITORY } from '@/user/domain/repositories/user.repository';
import {
  EntityNotFoundException,
  ValidationException,
} from '@/shared/domain/exceptions/domain.exception';
import { UpdateTimeOff } from '@/time-off/domain/entities/update-time-off';
import { UpdateTimeOffDto } from '@/time-off/application/dtos/update-time-off.dto';

@Injectable()
export class UpdateTimeOffUseCase {
  constructor(
    @Inject(TIME_OFF_REPOSITORY)
    private readonly timeOffRepository: TimeOffRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository, // Inyectamos el repositorio de usuarios para validar staffId si viene en el DTO
  ) {}

  async execute(id: number, dto: UpdateTimeOffDto): Promise<TimeOff> {
    // 1. Verificar si el registro de TimeOff existe antes de actualizar
    const existing = await this.timeOffRepository.findById(id);
    if (!existing) {
      throw new EntityNotFoundException('TimeOff', id);
    }

    // 2. Si el DTO incluye un nuevo staffId, validamos que ese usuario/empleado realmente exista
    if (dto.staffId !== undefined) {
      const staffMember = await this.userRepository.findById(dto.staffId);
      if (!staffMember) {
        throw new EntityNotFoundException('User', dto.staffId);
      }
    }

    // 3. Determinar las fechas finales que se usarán para la validación (usando las nuevas del DTO o conservando las existentes)
    const start = dto.startDatetime ?? existing.startDatetime;
    const end = dto.endDatetime ?? existing.endDatetime;

    // 4. Validar que la fecha de inicio sea estrictamente anterior a la de fin
    if (start >= end) {
      throw new ValidationException('The start datetime must be earlier than the end datetime');
    }

    // 5. Construir la entidad de dominio con los datos actualizados (aplicando fallback a los valores anteriores si no se envían)
    const updateTimeOff = new UpdateTimeOff(
      id,
      dto.staffId ?? existing.staffId,
      dto.reason ?? existing.reason,
      start,
      end,
    );

    // 6. Ejecutar la actualización en la base de datos a través del repositorio
    return this.timeOffRepository.update(updateTimeOff);
  }
}
