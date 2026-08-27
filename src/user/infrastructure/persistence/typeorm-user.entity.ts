import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { TypeOrmTimeOffEntity } from '@/time-off/infrastructure/persistence/typeorm-time-off.entity'; // Asegúrate de importar la otra entidad
import { TypeOrmStaffScheduleEntity } from '@/staff-schedule/infrastructure/persistence/typeorm-staff-schedule.entity';
import { TypeOrmStaffServiceEntity } from '@/staff-service/infrastructure/persistence/typeorm-staff-service.entity';

@Entity('user')
@Index('IDX_user_email_active_unique', ['email'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class TypeOrmUserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  phone?: string;

  // Cambiamos los booleanos antiguos por el rol centralizado
  @Column({ name: 'role_id' })
  roleId!: number;

  @Column({ default: true, name: 'is_enabled' })
  isEnabled!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => TypeOrmTimeOffEntity, (timeOff) => timeOff.staff, {
    cascade: true,
  })
  timeOffs!: TypeOrmTimeOffEntity[];

  @OneToMany(() => TypeOrmStaffScheduleEntity, (staffSchedule) => staffSchedule.staff, {
    cascade: true,
  })
  staffSchedules!: TypeOrmStaffScheduleEntity[];

  @OneToMany(() => TypeOrmStaffServiceEntity, (staffService) => staffService.staff, {
    cascade: true,
  })
  staffServices!: TypeOrmStaffServiceEntity[];
}
