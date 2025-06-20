export type LoadedFile<T> = {
  name: string;
  path: string;
  module: T;
};
