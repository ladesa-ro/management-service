import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ImagemArquivoListInputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoListInputDto";
import type { ImagemArquivoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoListOutputDto";

export interface IImagemArquivoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ImagemArquivoListInputDto | null,
  ): Promise<ImagemArquivoListOutputDto>;
}
