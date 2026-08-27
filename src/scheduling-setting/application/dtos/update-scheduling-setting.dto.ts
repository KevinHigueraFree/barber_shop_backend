import { PartialType } from '@nestjs/swagger';
import { CreateSchedulingSettingDto } from '@/scheduling-setting/application/dtos/create-scheduling-setting.dto';

export class UpdateSchedulingSettingDto extends PartialType(CreateSchedulingSettingDto) {}
