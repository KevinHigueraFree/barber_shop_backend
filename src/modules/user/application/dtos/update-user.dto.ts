import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/user/application/dtos/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
