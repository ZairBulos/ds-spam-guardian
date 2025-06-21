export interface KeyValueListStore {
  getList<T = string>(key: string): Promise<T[]>;
  pushToList<T = string>(key: string, value: T): Promise<void>;
  expire(key: string, ttlSeconds: number): Promise<void>;
}
