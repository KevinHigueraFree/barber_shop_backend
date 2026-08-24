import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmServiceEntity } from '@/service/infrastructure/persistence/typeorm-service.entity';
import { TypeOrmUserEntity } from '@/user/infrastructure/persistence/typeorm-user.entity';

@Entity('staff_service')
export class TypeOrmStaffServiceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'staff_id' })
  staffId!: number;

  @Column({ name: 'service_id' })
  serviceId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => TypeOrmUserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' })
  staff!: TypeOrmUserEntity;

  @ManyToOne(() => TypeOrmServiceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service!: TypeOrmServiceEntity;
}
