import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/core/@shared";
import {
  ImagemArquivoFindOneInput,
  ImagemArquivoFindOneOutput,
  ImagemArquivoListInput,
  ImagemArquivoListOutput,
} from "@/core/imagem-arquivo/application/dtos";
import {
  IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
  type IImagemArquivoQueryRepositoryPort,
  type IImagemArquivoUseCasePort,
} from "@/core/imagem-arquivo/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class ImagemArquivoService implements IImagemArquivoUseCasePort {
  constructor(
    @Inject(IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT)
    private readonly imagemArquivoRepository: IImagemArquivoQueryRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: ImagemArquivoListInput | null = null,
  ): Promise<ImagemArquivoListOutput> {
    return this.imagemArquivoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInput,
  ): Promise<ImagemArquivoFindOneOutput | null> {
    return this.imagemArquivoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: ImagemArquivoFindOneInput,
  ): Promise<ImagemArquivoFindOneOutput> {
    const imagemArquivo = await this.imagemArquivoRepository.findById(accessContext, dto);

    if (!imagemArquivo) {
      throw new ResourceNotFoundError("ImagemArquivo", dto.id);
    }

    return imagemArquivo;
  }
}
