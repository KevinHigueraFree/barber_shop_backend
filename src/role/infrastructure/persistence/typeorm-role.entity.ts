import { TypeOrmRolePermissionEntity } from '@/role-permission/infrastructure/persistence/typeorm-role-permission.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('role')
export class TypeOrmRoleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 45 })
  name!: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string | null = null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => TypeOrmRolePermissionEntity, (rp) => rp.role)
  rolePermissions?: TypeOrmRolePermissionEntity[];
}
