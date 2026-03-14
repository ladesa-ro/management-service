import type { Readable } from "node:stream";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ArquivoCreateInputDto } from "../../application/dtos";

export type IArquivoCreateCommand = {
  dto: Pick<ArquivoCreateInputDto, "name" | "mimeType">;
  data: NodeJS.ArrayBufferView | Readable;
};

export type IArquivoCreateCommandHandler = ICommandHandler<IArquivoCreateCommand, { id: string }>;
export const IArquivoCreateCommandHandler = Symbol("IArquivoCreateCommandHandler");
