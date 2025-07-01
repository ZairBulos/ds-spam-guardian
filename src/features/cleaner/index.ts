import { buildSpamCleaner } from "./cleaner.builder";
import { SpamCleanupLock } from "./locks/cleanup.lock";

const lock = new SpamCleanupLock();
const { clean } = buildSpamCleaner(lock);

export { clean };
