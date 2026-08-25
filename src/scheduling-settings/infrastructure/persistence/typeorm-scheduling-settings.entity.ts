import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Persistence model for the global scheduling settings.
 *
 * Intentionally does NOT include a `deleted_at` column: the scheduling settings
 * record must never be soft-deleted. It holds the single source of truth for
 * the slot duration (in minutes) used to build time slots.
 *
 * The DB-level CHECK guarantees the value is always positive even if inserted
 * outside the application (defense in depth on top of the DTO validation).
 */
@Entity('scheduling_settings')
@Check('chk_slot_duration_positive', 'slot_duration_minutes > 0')
export class TypeOrmSchedulingSettingsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'slot_duration_minutes', type: 'int' })
  slotDurationMinutes!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
