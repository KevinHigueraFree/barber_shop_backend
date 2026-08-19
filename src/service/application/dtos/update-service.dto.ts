import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from '@/service/application/dtos/create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
