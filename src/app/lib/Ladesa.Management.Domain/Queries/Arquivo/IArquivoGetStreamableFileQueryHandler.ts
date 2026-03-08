import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ArquivoGetFileInputDto } from "@/Ladesa.Management.Domain/Dtos/ArquivoGetFileInputDto";

export interface IArquivoGetStreamableFileQueryHandler {
  execute(
    accessContext: AccessContext | null,
    input: ArquivoGetFileInputDto,
  ): Promise<StreamableFile>;
}
