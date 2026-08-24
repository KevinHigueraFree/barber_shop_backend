import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TypeOrmUserEntity } from '@/user/infrastructure/persistence/typeorm-user.entity'; // Asegúrate de importar tu entidad de usuario

@Entity('time_off')
export class TypeOrmTimeOffEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'staff_id' })
  staffId!: number;

  @Column({ type: 'varchar', length: 200 })
  reason!: string;

  @Column({ name: 'start_datetime', type: 'timestamp' })
  startDatetime!: Date;

  @Column({ name: 'end_datetime', type: 'timestamp' })
  endDatetime!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  // Relación ManyToOne hacia la tabla centralizada de usuarios
  @ManyToOne(() => TypeOrmUserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' })
  staff!: TypeOrmUserEntity; // Cambié el nombre de la variable de 'user' a 'staff' para que sea más semántico, ¡pero puedes dejar 'user' si prefieres!
}
