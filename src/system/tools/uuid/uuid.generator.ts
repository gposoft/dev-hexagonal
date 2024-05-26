export class UuidGenerator {
  static generateUuid() {
    return crypto.randomUUID();
  }
}
