export class Schedule {
  private startHour: number;
  private endHour: number;

  //formato de 24 hras. 0-23
  constructor(startHour: number, endHour: number) {
    this.startHour = startHour;
    this.endHour = endHour;
  }

  isWithinRange(hour: Date): boolean {
    const hours = hour.getHours();
    return hours >= this.startHour && hours < this.endHour;
  }
}
