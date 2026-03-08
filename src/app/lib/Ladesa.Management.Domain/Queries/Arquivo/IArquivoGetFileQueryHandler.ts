import type { Readable } from "node:stream";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ArquivoGetFileInputDto } from "@/Ladesa.Management.Domain/Dtos/ArquivoGetFileInputDto";

export interface IArquivoGetFileQueryHandler {
  execute(
    accessContext: AccessContext | null,
    input: ArquivoGetFileInputDto,
  ): Promise<{
    id: string;
    nome: string | null;
    mimeType: string | null;
    stream: Readable | null;
  }>;
}
