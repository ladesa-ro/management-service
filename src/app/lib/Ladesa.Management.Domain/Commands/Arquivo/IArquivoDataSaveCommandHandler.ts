import type { Readable } from "node:stream";

export interface IArquivoDataSaveCommandHandler {
  execute(id: string, data: NodeJS.ArrayBufferView | Readable): Promise<boolean>;
}
