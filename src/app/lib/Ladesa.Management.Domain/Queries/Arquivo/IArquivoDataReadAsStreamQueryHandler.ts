import type { Readable } from "node:stream";

export interface IArquivoDataReadAsStreamQueryHandler {
  execute(id: string): Promise<Readable | null>;
}
