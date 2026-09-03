export class SchedulingRules {
  /** Is `duration` an exact multiple of `slotMinutes`? */
  static isDurationMultipleOf(duration: number, slotMinutes: number): boolean {
    return duration % slotMinutes === 0;
  }

  /** Is the range (in minutes since midnight) exactly ONE configured slot? */
  static isValidSlotRange(startMinutes: number, endMinutes: number, slotMinutes: number): boolean {
    return endMinutes - startMinutes === slotMinutes;
  }
}
