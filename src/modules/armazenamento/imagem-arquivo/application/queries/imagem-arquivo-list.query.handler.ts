import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IImagemArquivoListQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import type { AccessContext } from "@/server/access-context";
import type { ImagemArquivoListQuery, ImagemArquivoListQueryResult } from "../../domain/queries";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ImagemArquivoListQueryHandlerImpl implements IImagemArquivoListQueryHandler {
  constructor(
    @DeclareDependency(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: ImagemArquivoListQuery | null,
  ): Promise<ImagemArquivoListQueryResult> {
    return this.repository.findAll(accessContext, dto);
  }
}
