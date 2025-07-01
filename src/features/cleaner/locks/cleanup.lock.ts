export class SpamCleanupLock {
  private active = new Set<string>();

  public async run(
    guildId: string,
    userId: string,
    task: () => Promise<void>
  ): Promise<void> {
    const key = `${guildId}-${userId}`;
    if (this.active.has(key)) return;

    this.active.add(key);
    try {
      await task();
    } finally {
      this.active.delete(key);
    }
  }
}
