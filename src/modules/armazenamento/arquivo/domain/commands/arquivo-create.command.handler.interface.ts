import type { Readable } from "node:stream";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ArquivoCreateCommand } from "./arquivo-create.command";
export type IArquivoCreateCommand = {
  dto: Pick<ArquivoCreateCommand, "name" | "mimeType">;
  data: NodeJS.ArrayBufferView | Readable;
};

export type IArquivoCreateCommandHandler = ICommandHandler<IArquivoCreateCommand, { id: string }>;
export const IArquivoCreateCommandHandler = Symbol("IArquivoCreateCommandHandler");
