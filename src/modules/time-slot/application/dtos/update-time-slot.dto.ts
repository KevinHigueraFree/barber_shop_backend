import { PartialType } from '@nestjs/swagger';
import { CreateTimeSlotDto } from '@/modules/time-slot/application/dtos/create-time-slot.dto';

export class UpdateTimeSlotDto extends PartialType(CreateTimeSlotDto) {}
