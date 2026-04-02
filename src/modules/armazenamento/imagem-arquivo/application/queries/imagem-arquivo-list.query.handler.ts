import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IImagemArquivoListQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import type { ImagemArquivoListQuery, ImagemArquivoListQueryResult } from "../../domain/queries";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";

@Impl()
export class ImagemArquivoListQueryHandlerImpl implements IImagemArquivoListQueryHandler {
  constructor(
    @Dep(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: ImagemArquivoListQuery | null,
  ): Promise<ImagemArquivoListQueryResult> {
    return this.repository.getFindAllQueryResult(accessContext, dto);
  }
}
