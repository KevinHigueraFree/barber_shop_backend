import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { TypeOrmTimeOffEntity } from '@/time-off/infrastructure/persistence/typeorm-time-off.entity'; // Asegúrate de importar la otra entidad

@Entity('users')
export class TypeOrmUserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
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
}
