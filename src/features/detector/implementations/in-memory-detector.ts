import { buildSpamDetector } from "../detector.builder";
import { InMemorySpamRepository } from "../repositories/in-memory.repository";

const repository = new InMemorySpamRepository();

export const spamDetector = buildSpamDetector(repository);
