import { PartialType } from '@nestjs/swagger';
import { CreateTimeSlotDto } from '@/time-slot/application/dtos/create-time-slot.dto';

export class UpdateTimeSlotDto extends PartialType(CreateTimeSlotDto) {}
