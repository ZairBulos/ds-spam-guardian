import type { LoadedFile } from "../core/types/loaded-file";
import { readdirSync } from "fs";
import path from "path";

export const loadFiles = <T>(dir: string): LoadedFile<T>[] => {
  const directoryPath = path.join(__dirname, "..", dir);

  return readdirSync(directoryPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
    .map((file) => ({
      name: file,
      path: path.join(directoryPath, file),
      module: require(path.join(directoryPath, file)).default,
    }));
};
