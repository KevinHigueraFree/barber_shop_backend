import { PartialType } from '@nestjs/swagger';
import { CreateStaffScheduleDto } from '@/staff-schedule/application/dtos/create-staff-schedule.dto';
export class UpdateStaffScheduleDto extends PartialType(CreateStaffScheduleDto) {}
