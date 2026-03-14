import type { Readable } from "node:stream";

export const IStorageService = Symbol("IStorageService");

export interface IStorageService {
  exists(id: string): Promise<boolean>;
  save(id: string, data: NodeJS.ArrayBufferView | Readable): Promise<void>;
  readAsStream(id: string): Promise<Readable | null>;
}
