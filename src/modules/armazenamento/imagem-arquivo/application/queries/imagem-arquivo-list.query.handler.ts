import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IImagemArquivoListQuery,
  IImagemArquivoListQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import type { ImagemArquivoListQueryResult } from "../../domain/queries";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ImagemArquivoListQueryHandlerImpl implements IImagemArquivoListQueryHandler {
  constructor(
    @DeclareDependency(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IImagemArquivoListQuery): Promise<ImagemArquivoListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
