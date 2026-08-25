import { PartialType } from '@nestjs/swagger';
import { CreateSchedulingSettingsDto } from '@/scheduling-settings/application/dtos/create-scheduling-settings.dto';

export class UpdateSchedulingSettingsDto extends PartialType(CreateSchedulingSettingsDto) {}
