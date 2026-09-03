import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { TypeOrmStaffServiceEntity } from '@/modules/staff-service/infrastructure/persistence/typeorm-staff-service.entity';

const decimalTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => parseFloat(value),
};

@Entity('service')
export class TypeOrmServiceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description!: string | null;

  @Column('decimal', { precision: 10, scale: 2, transformer: decimalTransformer })
  price!: number;

  @Column('int')
  duration!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => TypeOrmStaffServiceEntity, (staffService) => staffService.service, {
    cascade: true,
  })
  staffServices!: TypeOrmStaffServiceEntity[];
}
