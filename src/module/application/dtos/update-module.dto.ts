import { PartialType } from '@nestjs/swagger';
import { CreateModuleDto } from '@/module/application/dtos/create-module.dto';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {}
