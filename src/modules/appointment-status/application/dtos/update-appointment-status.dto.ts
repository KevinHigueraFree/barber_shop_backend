import { PartialType } from '@nestjs/swagger';
import { CreateAppointmentStatusDto } from '@/modules/appointment-status/application/dtos/create-appointment-status.dto';

export class UpdateAppointmentStatusDto extends PartialType(CreateAppointmentStatusDto) {}
