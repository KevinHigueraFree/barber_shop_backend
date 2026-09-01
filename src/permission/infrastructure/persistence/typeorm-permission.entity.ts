import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeOrmActionEntity } from '@/action/infrastructure/persistence/typeorm-action.entity';
import { TypeOrmModuleEntity } from '@/module/infrastructure/persistence/typeorm-module.entity';

@Entity('permission')
export class TypeOrmPermissionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'module_id' })
  moduleId!: number;

  @Column({ name: 'action_id' })
  actionId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => TypeOrmModuleEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'module_id' })
  module!: TypeOrmModuleEntity;

  @ManyToOne(() => TypeOrmActionEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'action_id' })
  action!: TypeOrmActionEntity;
}
