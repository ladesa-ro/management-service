import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IImagemArquivoFindOneQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import type {
  ImagemArquivoFindOneQuery,
  ImagemArquivoFindOneQueryResult,
} from "../../domain/queries";
import { IImagemArquivoQueryRepository } from "../../domain/repositories";

@Impl()
export class ImagemArquivoFindOneQueryHandlerImpl implements IImagemArquivoFindOneQueryHandler {
  constructor(
    @Dep(IImagemArquivoQueryRepository)
    private readonly repository: IImagemArquivoQueryRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: ImagemArquivoFindOneQuery,
  ): Promise<ImagemArquivoFindOneQueryResult | null> {
    return this.repository.getFindOneQueryResult(accessContext, dto);
  }
}
