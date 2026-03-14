import { Inject, Injectable } from "@nestjs/common";
import {
  type IImagemArquivoFindOneQuery,
  IImagemArquivoFindOneQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import {
  type IImagemArquivoQueryRepositoryPort,
  IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { ImagemArquivoFindOneOutputDto } from "../../dtos";

@Injectable()
export class ImagemArquivoFindOneQueryHandlerImpl implements IImagemArquivoFindOneQueryHandler {
  constructor(
    @Inject(IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT)
    private readonly repository: IImagemArquivoQueryRepositoryPort,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IImagemArquivoFindOneQuery): Promise<ImagemArquivoFindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto);
  }
}
