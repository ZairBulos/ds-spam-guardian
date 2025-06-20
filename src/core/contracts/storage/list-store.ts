export interface ListStore {
  getAllItems<T = string>(key: string): Promise<T[]>;
  pushItem<T = string>(key: string, value: T): Promise<void>;
  setExpire(key: string, ttlSeconds: number): Promise<void>;
}
