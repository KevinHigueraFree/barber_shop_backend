import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeOrmAppointmentStatusEntity } from '@/modules/appointment-status/infrastructure/persistence/typeorm-appointment-status.entity';
import { TypeOrmUserEntity } from '@/modules/user/infrastructure/persistence/typeorm-user.entity';
import { TypeOrmAppointmentServiceEntity } from '@/modules/appointment-service/infrastructure/persistence/typeorm-appointment-service.entity';

@Entity('appointment')
export class TypeOrmAppointmentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'appointment_date', type: 'date' })
  date!: Date;

  @Column({ name: 'staff_id' })
  staffId!: number;

  @Column({ name: 'customer_id' })
  customerId!: number;

  @Column({ name: 'status_id' })
  statusId!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => TypeOrmAppointmentServiceEntity, (as) => as.appointment)
  appointmentServices!: TypeOrmAppointmentServiceEntity[];

  @ManyToOne(() => TypeOrmUserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'customer_id' })
  customer!: TypeOrmUserEntity;

  @ManyToOne(() => TypeOrmUserEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'staff_id' })
  staff!: TypeOrmUserEntity;

  @ManyToOne(() => TypeOrmAppointmentStatusEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'status_id' })
  status!: TypeOrmAppointmentStatusEntity;
}
