import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ImagemArquivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoFindOneInputDto";
import type { ImagemArquivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ImagemArquivoFindOneOutputDto";

export interface IImagemArquivoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInputDto,
  ): Promise<ImagemArquivoFindOneOutputDto | null>;
}
