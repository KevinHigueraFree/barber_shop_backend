import { Inject, Injectable } from '@nestjs/common';
import { TimeOff } from '@/time-off/domain/entities/time-off.entity';
import type { TimeOffRepository } from '@/time-off/domain/repositories/time-off.repository';
import { TIME_OFF_REPOSITORY } from '@/time-off/domain/repositories/time-off.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';

@Injectable()
export class GetTimeOffUseCase {
  constructor(
    @Inject(TIME_OFF_REPOSITORY)
    private readonly timeOffRepository: TimeOffRepository,
  ) {}

  async execute(id: number): Promise<TimeOff> {
    const time_off = await this.timeOffRepository.findById(id);
    if (!time_off) {
      throw new EntityNotFoundException('TimeOff', id);
    }
    return time_off;
  }
}
