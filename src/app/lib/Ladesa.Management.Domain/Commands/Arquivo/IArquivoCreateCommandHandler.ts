import type { Readable } from "node:stream";
import type { ArquivoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/ArquivoCreateInputDto";

export interface IArquivoCreateCommandHandler {
  execute(
    dto: Pick<ArquivoCreateInputDto, "name" | "mimeType">,
    data: NodeJS.ArrayBufferView | Readable,
  ): Promise<{ id: string }>;
}
