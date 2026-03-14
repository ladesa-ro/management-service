import { Inject, Injectable } from "@nestjs/common";
import {
  type IImagemArquivoListQuery,
  IImagemArquivoListQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import type { ImagemArquivoListOutputDto } from "../../dtos";
import {
  type IImagemArquivoQueryRepositoryPort,
  IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class ImagemArquivoListQueryHandlerImpl implements IImagemArquivoListQueryHandler {
  constructor(
    @Inject(IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT)
    private readonly repository: IImagemArquivoQueryRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IImagemArquivoListQuery): Promise<ImagemArquivoListOutputDto> {
    return this.repository.findAll(accessContext, dto);
  }
}
