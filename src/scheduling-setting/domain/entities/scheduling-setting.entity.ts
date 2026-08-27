/**
 * Domain entity representing the global scheduling settings.
 *
 * This is a singleton-like record: there must be at most ONE row across the
 * whole system (eventually scoped per-company). It defines the fixed duration
 * (in minutes) that every time slot must have, e.g. 10, 15 or 30.
 *
 * Business rules enforced at the application layer:
 * - It cannot be deleted (no delete column / no delete operation).
 * - No more than one record can exist (create is rejected when one already exists).
 */
export class SchedulingSetting {
  constructor(
    public readonly id: number,
    public slotDurationMinutes: number,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
