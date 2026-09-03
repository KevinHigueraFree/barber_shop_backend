import { PartialType } from '@nestjs/swagger';
import { CreateStaffScheduleDto } from '@/modules/staff-schedule/application/dtos/create-staff-schedule.dto';
export class UpdateStaffScheduleDto extends PartialType(CreateStaffScheduleDto) {}
