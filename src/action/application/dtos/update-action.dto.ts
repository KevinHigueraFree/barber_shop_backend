import { PartialType } from '@nestjs/swagger';
import { CreateActionDto } from '@/action/application/dtos/create-action.dto';

export class UpdateActionDto extends PartialType(CreateActionDto) {}
