import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmAppointmentEntity } from '@/modules/appointment/infrastructure/persistence/typeorm-appointment.entity';
import { TypeOrmTimeSlotEntity } from '@/modules/time-slot/infrastructure/persistence/typeorm-time-slot.entity';

@Entity('appointment_time_slot')
@Index('IDX_appointment_time_slot_active_unique', ['appointmentId', 'timeSlotId'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class TypeOrmAppointmentTimeSlotEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'appointment_id' })
  appointmentId!: number;

  @Column({ name: 'time_slot_id' })
  timeSlotId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => TypeOrmAppointmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'appointment_id' })
  appointment!: TypeOrmAppointmentEntity;

  @ManyToOne(() => TypeOrmTimeSlotEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'time_slot_id' })
  timeSlot!: TypeOrmTimeSlotEntity;
}
