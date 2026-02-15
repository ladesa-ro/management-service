import { Inject, Injectable } from "@nestjs/common";
import { BaseReadOnlyService } from "@/modules/@shared";
import type {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "@/modules/base/armazenamento/imagem-arquivo/application/dtos";
import {
  type IImagemArquivoQueryRepositoryPort,
  type IImagemArquivoUseCasePort,
  IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
} from "@/modules/base/armazenamento/imagem-arquivo/application/ports";

@Injectable()
export class ImagemArquivoService
  extends BaseReadOnlyService<
    ImagemArquivoListInputDto,
    ImagemArquivoListOutputDto,
    ImagemArquivoFindOneInputDto,
    ImagemArquivoFindOneOutputDto
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
