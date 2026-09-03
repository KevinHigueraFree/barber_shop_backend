import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmPermissionEntity } from '@/modules/permission/infrastructure/persistence/typeorm-permission.entity';
import { TypeOrmRoleEntity } from '@/modules/role/infrastructure/persistence/typeorm-role.entity';

@Entity('role_permission')
export class TypeOrmRolePermissionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'role_id' })
  roleId!: number;

  @Column({ name: 'permission_id' })
  permissionId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => TypeOrmRoleEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: TypeOrmRoleEntity;

  @ManyToOne(() => TypeOrmPermissionEntity, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'permission_id' })
  permission!: TypeOrmPermissionEntity;
}
