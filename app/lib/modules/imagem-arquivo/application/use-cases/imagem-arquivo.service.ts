import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/modules/@shared";
import type {
  ImagemArquivoFindOneInput,
  ImagemArquivoFindOneOutput,
  ImagemArquivoListInput,
  ImagemArquivoListOutput,
} from "@/modules/imagem-arquivo/application/dtos";
import {
  type IImagemArquivoQueryRepositoryPort,
  type IImagemArquivoUseCasePort,
  IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
} from "@/modules/imagem-arquivo/application/ports";

@Injectable()
export class ImagemArquivoService
  extends BaseReadOnlyService<
    ImagemArquivoListInput,
    ImagemArquivoListOutput,
    ImagemArquivoFindOneInput,
    ImagemArquivoFindOneOutput
  >
  implements IImagemArquivoUseCasePort
{
  protected readonly resourceName = "ImagemArquivo";

  constructor(
    @Inject(IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT)
    protected readonly repository: IImagemArquivoQueryRepositoryPort,
  ) {
    super();
  }
}
