import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '@/permission/application/dtos/create-permission.dto';
import { NewPermission } from '@/permission/domain/entities/new-permission';
import { Permission } from '@/permission/domain/entities/permission.entity';
import {
  PERMISSION_REPOSITORY,
  type PermissionRepository,
} from '@/permission/domain/repositories/permission.repository';
import { EntityNotFoundException } from '@/shared/domain/exceptions/domain.exception';
import { ConflictDomainException } from '@/shared/domain/exceptions/domain.exception';
import {
  MODULE_REPOSITORY,
  type ModuleRepository,
} from '@/module/domain/repositories/module.repository';
import {
  ACTION_REPOSITORY,
  type ActionRepository,
} from '@/action/domain/repositories/action.repository';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: ModuleRepository,
    @Inject(ACTION_REPOSITORY)
    private readonly actionRepository: ActionRepository,
  ) {}

  async execute(dto: CreatePermissionDto): Promise<Permission> {
    if (!(await this.moduleRepository.findById(dto.moduleId))) {
      throw new EntityNotFoundException('module', dto.moduleId);
    }

    if (!(await this.actionRepository.findById(dto.actionId))) {
      throw new EntityNotFoundException('action', dto.actionId);
    }

    const existing = await this.permissionRepository.findByModuleAndAction(
      dto.moduleId,
      dto.actionId,
    );

    if (existing) {
      throw new ConflictDomainException('The permission is already registered');
    }

    return this.permissionRepository.create(new NewPermission(dto.moduleId, dto.actionId));
  }
}
