export interface KeyValueStore {
  get<T = string>(key: string): Promise<T | null>;
  set<T = string>(key: string, value: T, ttlSeconds?: number): Promise<void>;
}
