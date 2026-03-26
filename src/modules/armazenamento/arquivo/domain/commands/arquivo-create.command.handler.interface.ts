import type { Readable } from "node:stream";
import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { ArquivoCreateCommand } from "./arquivo-create.command";

export type IArquivoCreateCommand = {
  dto: Pick<ArquivoCreateCommand, "name" | "mimeType">;
  data: NodeJS.ArrayBufferView | Readable;
};

export const ArquivoCreateCommandMetadata = createOperationMetadata({
  operationId: "arquivoCreate",
  summary: "Cria um arquivo",
});

export const IArquivoCreateCommandHandler = Symbol("IArquivoCreateCommandHandler");

export type IArquivoCreateCommandHandler = ICommandHandler<IArquivoCreateCommand, { id: string }>;
