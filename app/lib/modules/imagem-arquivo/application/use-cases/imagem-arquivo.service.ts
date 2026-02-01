import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
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
