import { buildSpamCleaner } from "./builder";
import { SpamCleanupLock } from "./cleanup-lock";

const lock = new SpamCleanupLock();
const { clean } = buildSpamCleaner(lock);

export { clean };
