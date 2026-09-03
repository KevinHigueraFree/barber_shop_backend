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
import { TypeOrmUserEntity } from '@/modules/user/infrastructure/persistence/typeorm-user.entity';

@Entity('staff_schedule')
export class TypeOrmStaffScheduleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'staff_id' })
  staffId!: number;

  @Column({ name: 'day_of_week', type: 'date' })
  dayOfWeek!: Date;

  @Column({ name: 'work_start_time', type: 'time' })
  workStartTime!: string;

  @Column({ name: 'work_end_time', type: 'time' })
  workEndTime!: string;

  @Column({ name: 'break_start_time', type: 'time', nullable: true })
  breakStartTime!: string | null;

  @Column({ name: 'break_end_time', type: 'time', nullable: true })
  breakEndTime!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => TypeOrmUserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' })
  staff!: TypeOrmUserEntity;
}
