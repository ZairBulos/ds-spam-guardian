export class SpamCleanupLock {
  private readonly active = new Set<string>();

  public async run(
    userId: string,
    guildId: string,
    task: () => Promise<void>
  ): Promise<void> {
    const key = this.getLockKey(userId, guildId);
    if (this.isLocked(key)) return;

    this.lock(key);
    try {
      await task();
    } finally {
      this.unlock(key);
    }
  }

  private getLockKey(userId: string, guildId: string): string {
    return `${userId}-${guildId}`;
  }

  private isLocked(key: string): boolean {
    return this.active.has(key);
  }

  private lock(key: string): void {
    this.active.add(key);
  }

  private unlock(key: string): void {
    this.active.delete(key);
  }
}
