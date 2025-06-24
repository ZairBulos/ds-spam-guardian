export class SpamCleanupLock {
  private readonly active = new Set<string>();

  public async run(userId: string, task: () => Promise<void>): Promise<void> {
    if (this.isLoked(userId)) return;

    this.lock(userId);
    try {
      await task();
    } finally {
      this.unlock(userId);
    }
  }

  private isLoked(userId: string): boolean {
    return this.active.has(userId);
  }

  private lock(userId: string): void {
    this.active.add(userId);
  }

  private unlock(userId: string): void {
    this.active.delete(userId);
  }
}
