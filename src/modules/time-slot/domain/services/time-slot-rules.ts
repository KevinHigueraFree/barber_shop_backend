export class TimeSlotRules {
  static normalize(time: string): string {
    return time.length === 5 ? `${time}:00` : time;
  }

  static toMinutes(time: string): number {
    const [hours, minutes] = this.normalize(time).split(':').map(Number);
    return hours * 60 + minutes;
  }
}
