import { PartialType } from '@nestjs/swagger';
import { CreateTimeOffDto } from '@/modules/time-off/application/dtos/create-time-off.dto';

export class UpdateTimeOffDto extends PartialType(CreateTimeOffDto) {}
