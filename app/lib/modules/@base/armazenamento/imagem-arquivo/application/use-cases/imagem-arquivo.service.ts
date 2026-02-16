import { Inject, Injectable } from "@nestjs/common";
import type {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
  ImagemArquivoListInputDto,
  ImagemArquivoListOutputDto,
} from "@/modules/@base/armazenamento/imagem-arquivo/application/dtos";
import {
  type IImagemArquivoQueryRepositoryPort,
  type IImagemArquivoUseCasePort,
  IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
} from "@/modules/@base/armazenamento/imagem-arquivo/application/ports";
import { BaseReadOnlyService } from "@/modules/@shared";

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
