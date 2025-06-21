import { buildSpamDetector } from "..";
import { InMemorySpamRepository } from "../repositories";

const inMemoryRepository = new InMemorySpamRepository();
export const spamDetector = buildSpamDetector(inMemoryRepository);
