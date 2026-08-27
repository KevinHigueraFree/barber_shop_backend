import { Inject, Injectable } from '@nestjs/common';
import { TimeOff } from '@/time-off/domain/entities/time-off.entity';
import type { TimeOffRepository } from '@/time-off/domain/repositories/time-off.repository';
import { TIME_OFF_REPOSITORY } from '@/time-off/domain/repositories/time-off.repository';

@Injectable()
export class ListTimeOffsUseCase {
  constructor(
    @Inject(TIME_OFF_REPOSITORY)
    private readonly timeOffRepository: TimeOffRepository,
  ) {}

  async execute(): Promise<TimeOff[]> {
    return this.timeOffRepository.findAll();
  }
}
