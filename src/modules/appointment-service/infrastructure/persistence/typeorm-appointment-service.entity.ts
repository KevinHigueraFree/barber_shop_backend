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
import { TypeOrmServiceEntity } from '@/modules/service/infrastructure/persistence/typeorm-service.entity';

const decimalTransformer = {
  to: (value: number) => value,
  from: (value: string) => parseFloat(value),
};

@Entity('appointment_service')
@Index('IDX_appointment_service_active_unique', ['appointmentId', 'serviceId'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class TypeOrmAppointmentServiceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'appointment_id' })
  appointmentId!: number;

  @Column({ name: 'service_id' })
  serviceId!: number;

  @Column('decimal', {
    name: 'price_at_service',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  priceAtService!: number;

  @Column({ name: 'quantity', type: 'integer' })
  quantity!: number;

  @Column('decimal', {
    name: 'total',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  total!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => TypeOrmAppointmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'appointment_id' })
  appointment!: TypeOrmAppointmentEntity;

  @ManyToOne(() => TypeOrmServiceEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'service_id' })
  service!: TypeOrmServiceEntity;
}
