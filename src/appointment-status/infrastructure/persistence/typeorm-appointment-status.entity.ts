import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Persistence model for the appointment status catalog (e.g. Pending,
 * Confirmed, Completed, Cancelled).
 *
 * - `name` is unique at DB level to avoid duplicate statuses.
 * - `description` optionally explains the meaning of the status.
 * - `colorCode` stores the associated color as HEX (`#RRGGBB`).
 * - `isEnabled` indicates whether the status can be used when creating an
 *   appointment (soft enable/disable).
 */
@Entity('appointment_status')
@Check('chk_appointment_status_name_not_empty', "TRIM(name) <> ''")
@Check(
  'chk_appointment_status_color_code_valid',
  "color_code ~ '^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$'",
)
export class TypeOrmAppointmentStatusEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string | null;

  @Column({ name: 'color_code', type: 'varchar', length: 8, default: 'CCCCCC' })
  colorCode!: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
